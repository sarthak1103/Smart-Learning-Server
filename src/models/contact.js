const mongoose= require('mongoose');

const contactUs= mongoose.Schema({
    name:String,
    email:String,
    mobile:Number,
    subject:String,
    message:String

})

module.exports= mongoose.model("contact",contactUs) ;