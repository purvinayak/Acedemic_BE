// const mongoose=require("mongoose");
// const Joi=require("joi");

// const AdminSchema= new mongoose.Schema({
//     name: {type:String,
//         required:true
//     },
//     email: {
//         type:String,
//         required:true,
//         unique:true
//     },
//     date: {
//         type:Date,
//         required:true
//     },
//     Address:{
//         type:String,
//         required:true
//     },
//     mo:{ 
//         type:Number,
//         required:true
//     },
//     isActive: {
//         type: Boolean,
//         default: true, // Default value if not provided
//     },
// })
// let adminSchema=Joi.object({
//     name:Joi.string().min(3)
//     .max(30).required(),
//     email:Joi.string().email().required(),
//     date:Joi.date().required(),
//     Address:Joi.string().min(3).required(),
//     mo:Joi.number().min(10).max(12).required(),
//     isActive: Joi.boolean().default(true),

// }).options({ allowUnknown: true });

// let adminmodel=mongoose.model("AdminSchema",AdminSchema);

// module.exports={adminmodel,adminSchema};

const mongoose=require("mongoose");
const Joi=require("joi");

const AdminSchema= new mongoose.Schema({
    name: {type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    date: {
        type:Date,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    MobileNo:{ 
        type:Number,
        required:true
    },
    isActive: {
        type: Boolean,
        default: true, // Default value if not provided
    },
})
let adminSchema=Joi.object({
    name:Joi.string().min(3)
    .max(30).required(),
    email:Joi.string().email().required(),
    date:Joi.date().required(),
    Address:Joi.string().min(3).required(),
    MobileNo:Joi.number().min(10).required(),
    isActive: Joi.boolean().default(true),

}).options({ allowUnknown: true });

// let adminmodel=mongoose.model("AdminSchema",AdminSchema);
const adminmodel = mongoose.models.AdminSchema || mongoose.model("AdminSchema", AdminSchema);
module.exports={adminmodel,adminSchema};
