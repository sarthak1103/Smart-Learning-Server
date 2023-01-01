const mongoose= require('mongoose');

const CourseSchema= mongoose.Schema({
    name:String,
    category:String,
    image:String,
    content:String,
    youtubeUrl:String

})

module.exports= mongoose.model("Courses",CourseSchema) ;