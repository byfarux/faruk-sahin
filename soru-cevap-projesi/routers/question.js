const express = require("express")
const getAllquestion = require("../controllers/question")

const router = express.Router()

router.get("/",getAllquestion)



module.exports = router