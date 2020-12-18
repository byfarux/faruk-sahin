const multer = require("multer")
const path = require("path")
const CustomError = require("../../helpers/CustomError")

const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        
        const rootDir = path.dirname(require.main.filename)
        cb(null,path.join(rootDir,"/public/upload"))
    },
    filename : function (req,file,cb) {
        
        const extension = file.mimetype.split("/")[1]
        req.savedProfileImage = "image_" + req.user.id + "." + extension
        cb(null,req.savedProfileImage)
    }
}) 

const fileFilter = (req,file,cb) => {
    let allowedMimeType = ["image/jpg","image/jpeg","image/png","image/gif"]

    if (!allowedMimeType.includes(file.mimetype)) {
        return cb(new CustomError("Dosya uzantısı yalnızca 'jpg,jpeg,png,gif'tipinde olabilir",400),false)
    }
    return cb(null,true)
}

const profileImageUpload = multer({ storage,fileFilter })

module.exports = profileImageUpload