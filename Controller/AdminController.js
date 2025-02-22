// const express=require("express");
// const app=express();
// const {adminmodel,adminSchema}=require("../Model/Adminmodel");

// const postAdmin_Institute=((req,res)=>{
//     try{
// //     let name=req.body.name;
// //     let mo=req.body.mo;
// //     let email=req.body.email;
// //     let address=req.body.address;
// //     let date=req.body.date;

// // if(!name || !mo || !email || !address || !date){
// //     res.send({
// //         mas:"please fill fields",
// //     })
// // }

//     let data=req.body;
//     let newAdmin=new adminmodel(data);
//     let validate=adminSchema.validate(newAdmin);
//     console.log("validate----",validate);
//     if(validate.error){
//         res.status(400).send({
//             mas:"invalid data",
//             })
//             }
//             else{
//     newAdmin.save().then(()=>{
//         res.status(201).send({
//             mas:"Text Added Successfully",
//             data:newAdmin
//             })
//     }).catch((err)=>{
//         res.status(500).send({
//             mas:"Error Occured",
//             err:err
//             })
//     })

// }
// }
//     catch(err){
//         res.status(500).send({
//             mas:"Error Occured",
//             err:err
//             })
//             }
// })
// const getAdmin_Institute=(req,res)=>{
//     try{
//     adminmodel.find().then((data)=>{
//         res.status(200).send({
//             mas:"Data Fetched Successfully",
//             data:data
//             })
//             }).catch((err)=>{
//                 res.status(500).send({
//                     mas:"Error Occured",
//                     err:err
//                     })
//                     })
//                 }
//                 catch(err){
//                     res.status(500).send({
//                         mas:"Error Occured",
//                         err:err
//                         })
//                         }
// }

// const updateAdmin_Institute=(req,res)=>{
//     try{
//         adminmodel.updateOne({_id:req.query.id},req.body).then((data)=>{
//             res.status(200).send({
//                 mas:"Data Updated Successfully",
//                 data:data
//                 })
//                 }).catch((err)=>{
//                     res.status(500).send({
//                         mas:"Error Occured",
//                         err:err
//                         })

//         })
//     }
//     catch(err){
//         res.status(500).send({
//             mas:"Error Occured",
//             err:err
//             })
//     }    
// }
// const deleteAdmin_Institute=(req,res)=>{
//     try{
//         adminmodel.deleteOne({_id:req.query.id}).then(()=>{
//             res.status(200).send({
//                 mas:"Data Deleted Successfully",
//                 isSuccess:false
//                 })
//         }).catch((err)=>{
//             res.status(500).send({
//                 mas:"Error Occured",
//                 err:err
//                 })
//         })

//     }
//     catch(err){
//         res.status(500).send({
//             mas:"Error Occured",
//             err:err
//             })
//     }
// }
// module.exports={postAdmin_Institute,getAdmin_Institute,updateAdmin_Institute,deleteAdmin_Institute};

const express = require("express");
const app = express();
const { adminmodel, adminSchema } = require("../Model/Adminmodel");
const { trusted } = require("mongoose");



const postAdmin_Institute = (req, res) => {
    try {
        let data = req.body;

        // Normalize field names
        if (data.mobileNo) {
            data.MobileNo = data.mobileNo;
            delete data.mobileNo; 
        }

        // Validate input data
        let validate = adminSchema.validate(data);
        if (validate.error) {
            console.log("Validation Error Details:", validate.error.details);
            return res.status(400).send({
                mas: "Invalid data",
                details: validate.error.details,
                isSuccess: false,
            });
        }

      
        let newAdmin = new adminmodel(data);
        newAdmin
            .save()
            .then(() => {
                res.status(201).send({
                    mas: "Text Added Successfully",
                    data: newAdmin,
                    isSuccess: true,
                });
            })
            .catch((err) => {
                res.status(500).send({
                    mas: "Error Occurred",
                    err: err.message,
                    isSuccess: false,
                });
            });
    } catch (err) {
        res.status(500).send({
            mas: "Error Occurred",
            err: err.message,
            isSuccess: false,
        });
    }
};


const getAdmin_Institute = (req, res) => {
    try {
        adminmodel.find().then((data) => {
            res.status(200).send({
                mas: "Data Fetched Successfully",
                data: data
            })
        }).catch((err) => {
            res.status(500).send({
                mas: "Error Occured",
                err: err
            })
        })
    }
    catch (err) {
        res.status(500).send({
            mas: "Error Occured",
            err: err
        })
    }
}

const updateAdmin_Institute = (req, res) => {
    try {
        console.log("77", req.query.id);
        console.log("Update Request Body:", req.body);

        adminmodel.updateOne({ _id: req.query.id }, req.body).then((data) => {
            console.log("Update Query ID:", req.query.id);
            console.log("MongoDB Update Result:", result);
            console.log('322')
            res.status(200).send({
                mas: "Data Updated Successfully",
                data: data
            })
        }).catch((err) => {
            console.log('9090')
            res.status(500).send({
                mas: "Error Occured",
                err: err
            })

        })
    }
    catch (err) {
        res.status(500).send({
            mas: "Error Occured",
            err: err
        })
    }
}
const deleteAdmin_Institute = (req, res) => {
    try {

        console.log("Delete Request Body:", req.body);
        adminmodel.deleteOne({ _id: req.query.id }).then(() => {
            res.status(200).send({
                mas: "Data Deleted Successfully",
                isSuccess: trusted
            })
        }).catch((err) => {
            res.status(500).send({
                mas: "Error Occured",
                err: err
            })
        })

    }
    catch (err) {
        res.status(500).send({
            mas: "Error Occured",
            err: err
        })
    }
}
module.exports = { postAdmin_Institute, getAdmin_Institute, updateAdmin_Institute, deleteAdmin_Institute };





