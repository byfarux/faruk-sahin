'use strict'
const express = require("express")
const dotenv = require("dotenv")
const connectDatabase = require("./helpers/connectDatabase")
const routers = require("./routers/index")
const path = require("path")
const customErrorHandling = require ("./middlewares/customErrorHandling")



dotenv.config({
    path: "./config/config.env"
})

connectDatabase()

const app = express()

app.use(express.json())

const PORT = process.env.PORT

app.get('/', (req, res) => {
    res.status(200).send('S.a').end();
  });

app.use("/api",routers)

app.use(customErrorHandling)

app.use(express.static(path.join(__dirname,"public")))

app.listen(PORT,() => {
    console.log(`App Started on : ${PORT} : ${process.env.NODE_ENV}`)
})

module.exports = app