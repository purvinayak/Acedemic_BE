const mongoose=require("mongoose");
const Joi=require('joi')

const InstituteStudent = new mongoose.Schema({
     
        Batch:{
            type:String,
            required:true
            },
            StudentName:{
                type: String,
                required:true
            },
            MobileNo:{
                type:Number,
                required:true
            },
            Email:{
                type:String,
                require:true
            },
            Course:{
                type:String,
                required:true
            },
            Duration:{
                type:String,
                required:true
            },
            DecidedFees:{
                type:Number,
                required:true
            }
        
})
let  InstituteStudentSchema=Joi.object({
    
    Batch:Joi.string().min(1).max(10).required(),
    StudentName: Joi.string().min(1).max(30).required(),
    MobileNo:Joi.number().min(10).required(),
    Email:Joi.string().min(1).max(30).required(),
    Course:Joi.string().required(),
    Duration: Joi.string().required(),
    DecidedFees: Joi.number().required()
})

let InstituteStudentModel=mongoose.model("InstituteStudent",InstituteStudent)
module.exports={ InstituteStudentModel,InstituteStudentSchema};