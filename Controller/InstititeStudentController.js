const express=require("express");
const {InstituteStudentModel, InstituteStudentSchema}=require("../Model/InstituteStudentModel")

const postStudent = async (req, res) => {
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
        const validate = InstituteStudentSchema.validate(data, { allowUnknown: true });
        if (validate.error) {
            console.log("Validation Error Details:", validate.error.details);
            return res.status(400).json({
                msg: "Invalid data",
                details: validate.error.details,
                isSuccess: false,
            });
        }
        const newInstitute = new InstituteStudentModel(data);
        await newInstitute.save();
        return res.status(201).json({
            msg: "Student Added Successfully",
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
};

const getStudent=(req,res)=>{
    try{
        InstituteStudentModel.find().then((data)=>{
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

const getByIdStudent=(req,res)=>{
    try{
        InstituteStudentModel.findOne({_id:req.query.id})
       .then((data)=>{
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

const updateStudent=(req,res)=>{
try{
    InstituteStudentModel.updateOne({ _id: req.query.id }, req.body )
     
    .then((data) => {    
        res.send({
            mas: "Student Updated Successfully",
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

const deleteStudent=(req,res)=>{
    try{
        InstituteStudentModel.deleteOne({ _id: req.query.id })
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


module.exports={postStudent,getStudent,getByIdStudent,updateStudent,deleteStudent}