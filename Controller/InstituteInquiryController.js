const express=require("express");
const {InstituteInquiryModel, InstituteInquirySchema}=require("../Model/InstituteInquiryModel")

const postInquiry = async (req, res) => {
    try {
        let data = req.body;
        console.log("Received Data:", data);

        if (data.mobileNo) {
            data.MobileNo = data.mobileNo;
            delete data.mobileNo;
        }
        if (!data.MobileNo) {
            return res.status(400).json({
                msg: "MobileNo is required",
                isSuccess: false
            });
        }
        const validate = InstituteInquirySchema.validate(data, { allowUnknown: true });
        if (validate.error) {
            console.log("Validation Error Details:", validate.error.details);
            return res.status(400).json({
                msg: "Invalid data",
                details: validate.error.details,
                isSuccess: false,
            });
        }
        const newInstitute = new InstituteInquiryModel(data);
        await newInstitute.save();
        return res.status(201).json({
            msg: "Inquiry completed Successfully",
            data: newInstitute,
            isSuccess: true,
        });

    } catch (err) {
        console.error("Error Occurred:", err);
        return res.status(500).json({
            msg: "Internal Server Error",
            error: err.message,
            isSuccess: false,
        });
    }
}

const getInquiry=(req,res)=>{
    try{
        InstituteInquiryModel.find().then((data)=>{
            res.send({
            mas:"Student find Successfully",
            data:data
            })
        }).catch((err)=>{
            res.send({
            mas:err.message
            })
            })
    }
    catch(err){
        res.send({
        mas:err.message
        
        })

    }
}

const deleteInquiry=(req,res)=>{
    try{
        InstituteInquiryModel.deleteOne({ _id: req.query.id })
        .then((data) => {
            res.send({
              mas: "Student Deleted Successfully",
              data: data
              })
            }).catch((err) => {
                res.send({
                mas: err.message
                })
            })
        }
catch(err){
    res.send({
    mas:err.message
    })
}
}


module.exports={postInquiry,getInquiry,deleteInquiry}