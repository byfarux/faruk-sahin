const express = require("express")
const router = express.Router()
const { 
    register,
    getUser,
    login,
    logout,
    imageUpload,
    forgotpassword,
    resetPassowrd,
    editUser
      } = require("../controllers/auth")
const { getAccessToRoute } = require("../middlewares/authorization/auth")
const profileImageUpload = require("../middlewares/libraries/profileImageUpload")

router.post("/register",register)
router.post("/login",login)
router.get("/profile",getAccessToRoute,getUser)
router.get("/logout",getAccessToRoute,logout)
router.post("/upload",[getAccessToRoute,profileImageUpload.single("profile_image")],imageUpload)
router.post("/forgotpassword",forgotpassword)
router.put("/resetpassword",resetPassowrd)
router.put("/edituser",getAccessToRoute,editUser)


module.exports = router