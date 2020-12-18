const User = require("../models/User")
const CustomError = require("../helpers/CustomError")
const asynchandler = require("express-async-handler")
const { sendTokenToCookie } = require("../helpers/tokenHelpers")
const getAccessToRoute = require("../middlewares/authorization/auth")
const {inputDogrula,comparePassword} = require("../helpers/inputhelpers")
const { response } = require("express")
const sendMail = require("../helpers/sendMail")




const register = asynchandler ( async (req,res,next) => {
    console.log(req.body);

        const {name,email,password,role} = req.body
        const user = await User.create({

            name,
            email,
            password,
            role
        })
        
        sendTokenToCookie(user,res)

})

const login = asynchandler ( async (req,res,next) => {

    const {email,password} = req.body

    if (!inputDogrula(email,password)) {
        return next(new CustomError("Lütfen tüm Alanları doldurun",400))
    }

    const user = await User.findOne({email}).select("+password") // emaili bu olanın kopmple bilgilerini getir

    if (!comparePassword(password,user.password)) {
        return next(new CustomError("Yanlış parola girdiniz",400))
    }

     sendTokenToCookie(user,res)

})

const logout = asynchandler ( async (req,res,next) => {

    res
    .status(200)
    .cookie({
        httpOnly : true,
        expires : new Date (Date.now()),
        secure :  process.env.NODE_ENV === "development" ? false : true
    })
    .json({
        success : true,
        message : "Çıkış tamamlandı"
    })

})

const getUser = (req,res,next) => {
    res.json({
        success:true,
        data: req.user
    })
}

const imageUpload = asynchandler ( async (req,res,next) => {

    const user = await User.findByIdAndUpdate(req.user.id,{
        "profile_image" : req.savedProfileImage
    },{
        new : true,
        runValidators : true
    })

    res.status(200)
    .json({
        success:true,
        message:"Resim Yükleme Başarılı",
        data : user
    })

})

const forgotpassword = asynchandler ( async (req,res,next) => {

    const resetlenecekEmail = req.body.email  

    const user = await User.findOne({ email : resetlenecekEmail })

    if (!user) {
        return next(new CustomError("Kayıtlı mail adresi bulunamadı",400))
    }

    const resetPasswordToken = user.getResetPasswordTokenFromUser()

    await user.save()

    const resetPasswordUrl = `http://localhost:5000/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`

    const emailTemplate = `
    <h3>Reset Password</h3>
    <p>This <a href = '${resetPasswordUrl}' target = '_blank'>link</a> will expire in 1 hour</p>
    `

    try {
        await sendMail({
            from : process.env.SMTP_USER,
            to : resetlenecekEmail,
            subject : "Reset Your Password",
            html : emailTemplate
        })

        return res.status(200)
        .json({
            success: true,
            message: "Token mail adresinize gönderildi",
            data : user
        })
    }
    catch (err) {
        user.resetPasswordToken  = undefined
        user.resetPasswordExpire = undefined

        await user.save()

        return next(new CustomError("Email Gönderilemedi",500))
    }
})

const resetPassowrd = asynchandler ( async (req,res,next) => {

    const {resetPasswordToken} = req.query

    const {password} = req.body

    if (!resetPasswordToken) {
        return next(new CustomError("Lütfen bir parola girin"),400)
    }

    let user = await User.findOne({
        resetPasswordToken : resetPasswordToken,
        resetPasswordExpire : { $gt: Date.now()}
    })
    
    if (!user) {
        return next(new CustomError("Yanlış token veya süresi bitmiş",404))
    }

    user.password = password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    return res
    .status(200)
    .json({
        success : true,
        message : "Parolanız sıfırlanmıştır."
    })

})

const editUser = asynchandler ( async (req,res,next) =>{

    const editlenecekObjeler = req.body

    const user = await User.findByIdAndUpdate(req.user.id,editlenecekObjeler,{
        new : true,
        runValidators : true
    })


    return res
    .status(200)
    .json({
        success: true,
        message: "Güncellendi"
    })
})

// const hatatestfonk = (req,res,next) => {
//    next(new SyntaxError("SyntaxError Message : HATA!", 400))
// }

module.exports = {
    register,
    getUser,
    logout,
    login,
    imageUpload,
    forgotpassword,
    resetPassowrd,
    editUser
}