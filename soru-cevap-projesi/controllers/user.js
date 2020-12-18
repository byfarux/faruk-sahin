const CustomError = require("../helpers/CustomError")
const asynchandler = require("express-async-handler")
const User = require("../models/User")


const getSingleUser = asynchandler ( async (req,res,next) => {
    
    const userId = req.params.id

    const user = await User.findById(userId)

    res
    .status(200)
    .json({
        success : true,
        message : "ok",
        data : user
    })

})


const getAllUsers = asynchandler ( async (req,res,next) => {

    const allUsers = await User.find()

    res
    .status(200)
    .json({
        success : true,
        message : "ok",
        data : allUsers
    })

})


module.exports = {getSingleUser,getAllUsers}