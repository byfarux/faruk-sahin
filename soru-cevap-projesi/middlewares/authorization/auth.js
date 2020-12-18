const CustomError = require("../../helpers/CustomError")
const jwt = require("jsonwebtoken")
const {isTokenIncluded,getAccessFromHeader} = require("../../helpers/tokenHelpers")
const asynchandler = require("express-async-handler")
const User = require("../../models/User")


const getAccessToRoute = (req,res,next) => {


        if (!isTokenIncluded(req)) {
            
            next(new CustomError("You are not authorized to access this route",401))
        }

        const accessToken = getAccessFromHeader(req)
        
        jwt.verify(accessToken,process.env.JWT_SECRET_KEY,(err,decoded)=>{
            
            if(err){
                next(new CustomError("You are not authorized to access this route.(Süresi dolmuş token)",401))
            }

            req.user = {
                id : decoded.id,
                name : decoded.name
            }
            
        })
        next()
}

const getAdminAccess = asynchandler(async(req,res,next) => {
    const {id} = req.user

    const user = await User.findById(id)

    if (user.role !== "admin") {
        return next(new CustomError("Sadece adminler bu sayfaya erişebilir",403))
    }
    next()
})

module.exports = {
    getAccessToRoute,
    getAdminAccess
}