
const getAllquestion = (req,res,next)=>{
    res
    .status(200)
    .json({
        success : true,
        question: "hazır"
    })
}

module.exports = getAllquestion