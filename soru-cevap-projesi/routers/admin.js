const express = require("express")
const {admin,blockUser,deleteUser} = require("../controllers/admin")
const {getAccessToRoute,getAdminAccess} = require("../middlewares/authorization/auth")
const existIdChecker = require("../middlewares/database/databaseErrorHelpers")

const router = express.Router()

router.use([getAccessToRoute,getAdminAccess])
router.get("/block/:id",existIdChecker,blockUser)
router.get("/",admin)
router.delete("/deleteUser/:id",deleteUser)


module.exports = router