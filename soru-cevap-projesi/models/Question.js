const mongoose = require("mongoose")

const Schema = mongoose.Schema

const QuestionSchema = new Schema({
    title : {
        type : String,
        required :[ true,"Lütfen bir değer girin."],
        minlength : [10,"En az 10 karakter girin"],
        unique : true
    },

    content : {
        type : String,
        required : [true,"Lütfen bir içerik girin."],
        minlength : [20,"En az 20 karakter girin"]
    },

    slug : String,

    cretedAt : {
        type : Date,
        default : Date.now
    },

    user : {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref : "User"
    }

})

module.exports = mongoose.model("Question",QuestionSchema)