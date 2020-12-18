const express = require("express")
const {getSingleUser,getAllUsers} = require("../controllers/user")
const existIdChecker = require("../middlewares/database/databaseErrorHelpers")

const router = express.Router()

router.get("/",getAllUsers)
router.get("/:id",existIdChecker,getSingleUser)

module.exports = router