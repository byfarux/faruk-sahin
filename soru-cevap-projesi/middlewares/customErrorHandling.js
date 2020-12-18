const CustomError = require("../helpers/CustomError");

const customErrorHandling = (err,req,res,next) => {

    let customError = err  //Oluşturduğumuz CustomError objesini yakaladık 

    if (err.name==="SyntaxError") {
        customError = new CustomError("Beklenmedik Yazım hatası",400)
    }

    if (err.name==="Validation Error") {
        customError = new CustomError(err.message,400)
    }

    if (err.name==="CastError") {
        customError = new CustomError("Lütfen geçerli bir id girin",400)
    }

    if (err.code===11000) {
        customError = new CustomError("Bu email adresi daha önce kullanılmış",400)
    }


    res
    .status(customError.status || 500)
    .json({
        success : false,
        message : customError.message
    })
}

module.exports = customErrorHandling