const User = require("../../models/User")
const CustomError = require("../../helpers/CustomError")
const asynchandler = require("express-async-handler")

const existIdChecker = asynchandler ( async (req,res,next) => {

    const userId = req.params.id

    const user = await User.findById(userId)

    if (!user) {
        return next(new CustomError("'ID' bulunamadı.",400))
    }

    next()

})

module.exports = existIdChecker