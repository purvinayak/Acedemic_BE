const mongoose=require("mongoose");
const Joi=require('joi')

const InstituteInquiry = new mongoose.Schema({
     
    StudentName:{
        type:String,
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
        require:true
    }

})

let  InstituteInquirySchema=Joi.object({

    StudentName: Joi.string().min(1).max(30).required(),
    MobileNo:Joi.number().min(10).required(),
    Email:Joi.string().min(1).max(30).required(),
    Course:Joi.string().required(),
     
})

let InstituteInquiryModel=mongoose.model("InstituteInquiry",InstituteInquiry)
module.exports={ InstituteInquiryModel,InstituteInquirySchema};