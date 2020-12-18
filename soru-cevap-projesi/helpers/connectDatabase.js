const mongoose = require("mongoose")

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true
    })
    .then(()=>{
        console.log("Veri tabanı bağlandı")
    })
    .catch(()=>{
        console.error(err)
    })
}

module.exports = connectDatabase