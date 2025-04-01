// const mongoose=require("mongoose");
// const Joi=require('joi')

// const InstituteSchem = new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//         },  
//         Duration:{
//             type:String,
//             required:true
//             },
//             Fees:{
//                 type:Number,
//                 required:true
//             }
        
// })
// let Institute=Joi.object({
//     name: Joi.string()
//         .min(3)
//         .max(30)
//         .required(),
//         Duration: Joi.string()
//         .min(3)
//         .max(30)
//         .required(),
//         Fees: Joi.number()
//         .min(1)
//         .max(1000)
//         .required()
//         })

// let Institutesmodel=mongoose.model("Institute",InstituteSchem)
// module.exports={Institutesmodel,Institute};

const mongoose=require("mongoose");
const Joi=require('joi')

const InstituteSchem = new mongoose.Schema({
    Course_Name:{
        type:String,
        required:true
        },  
        duration:{
            type:String,
            required:true
            },
            fees:{
                type:Number,
                required:true
            }
        
})
let Institute=Joi.object({
    Course_Name: Joi.string()
        .min(3)
        .max(30)
        .required(),
        duration: Joi.string()
        .min(3)
        .max(30)
        .required(),
        fees: Joi.number()
        .min(1)
        .required()
        })

let Institutesmodel=mongoose.model("Institute_Course",InstituteSchem)
module.exports={Institutesmodel,Institute};