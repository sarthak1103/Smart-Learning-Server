const courses = require('../models/courses');
const fs=require('fs');
module.exports= class course{
    //fetch al courses
    static async fetchAllCourse(req,res){
        try {
            const getCourse= await courses.find();
            res.status(200).json(getCourse);
        } catch (error) {
            res.status(error.code).json(error.message);
        }
    }
  // fetch courses by id

  static async fetchCourseById(req,res){
   const id= req.params.id;
   try {
     const course=await courses.findById(id);
     res.status(200).json(course);
   } catch (error) {
    res.status(404).json({message:error.message}); 

    
   }
}

// add course
static async AddCourse(req,res){
    const addCourse= req.body;
    console.log(req.file)
    const imageName= req.file+"_"+feildname+"_"+Date.now().toString()+"_"+file.orignalname;

    addCourse.image= imageName;
    try {
        await courses.create(addCourse);
        res.status(201).json({message:'course added successfully'});
    } catch (error) {
        res.status(400).json({message:'something went wrong'});

    }
}
static async deleteCourse(req,res){
    const id=req.params.id;
    try {
        const result=await Course.findByIdAndDelete(id);
        if(result.image!=''){
            try {
                fs.unlinkSync('./src/uploads/'+result.image );
            } catch (error) {
                console.log(error);
            }
        }
        res.status(200).json({message:'course deleted successfully'});
    } catch (error) {
        res.status(404).json({message:error.message});

    }

}
}