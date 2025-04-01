const mongoose=require("mongoose");
const Joi=require('joi')

const InstitutePayment = new mongoose.Schema({
     
    StudentName:{
        type:String,
        required:true
    },
    MobileNo:{
         type:Number,
         required:true
    },
    Course:{
        type:String,
        require:true
    },
    Duration:{
        type:String,
        required:true
    },
    RecievedFees:{
        type:Number,
        required:true
    },
    RemainingFees:{
        type:Number,
         required:true
    },
    
})

let  InstitutePaymentSchema=Joi.object({

    StudentName: Joi.string().min(1).max(30).required(),
    MobileNo:Joi.number().min(10).required(),
    RecievedFees:Joi.number().min(1).max(50).required(),
    RemainingFees:Joi.number().min(1).max(50).required(),
})

let InstitutePaymentModel=mongoose.model("InstitutePayment",InstitutePayment)
module.exports={ InstitutePaymentModel,InstitutePaymentSchema};