const CustomError = require("../helpers/CustomError")
const asynchandler = require("express-async-handler")
const User = require("../models/User")


const admin = asynchandler ( async (req,res,next) => {

    res
    .status(200)
    .json({
        success : true,
        message : "Admin Page",
    })

})


const blockUser = asynchandler ( async (req,res,next) => {

    const {id} = req.params // VEYA const id = req.params.id

    const user = await User.findById(id)

    user.blocked = !user.blocked

    await user.save()

    return res
    .status(200)
    .json({
        success : true,
        message : "User Blocked / Unblocked",
    })

})

const deleteUser = asynchandler ( async (req,res,next) => {

    const {id} = req.params // VEYA const id = req.params.id

    const user = await User.findById(id)

    await user.remove()


    return res
    .status(200)
    .json({
        success : true,
        message : "User Deleted",
    })

})

module.exports = {admin,blockUser,deleteUser}