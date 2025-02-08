const express=require("express");
const Institutesmodel=require("../Model/Institutemodel")

const postInstitute_Course=((req,res)=>{
    try{
    let Coursename=req.body.Coursename;
    let Duration=req.body.Duration;
    let fees=req.body.fees;

 if(!Coursename || !Duration || !fees){
    res.send({
        mas:"Please fill the all fields",
    })
 }
 else{
    const newCourse=new Institutesmodel(data)
    newCourse.save().then(()=>{
        res.send({
            mas:"Course Added Successfully",
            data:newCourse
            })
    }).catch((err)=>{
        res.send({
            mas:err.message
            })
    })
 }
    }
    catch(err){
        res.send({
            mas:err.message
            })
            }
})

const getInstitute_Course=(req,res)=>{
    try{
        Institutesmodel.find().then((data)=>{
            res.send({
                mas:"Course Added Successfully",
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

const getInstituteCourse_ByID=(req,res)=>{
    try{
        Institutesmodel.findOne({_id:req.query.id})
       .then((data)=>{
        res.send({
            mas:"Course Added Successfully",
            data:data
            })
       })
                .catch((err)=>{
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

const deleteInstitute_Course=()=>{
    try{
        Institutesmodel.deleteOne({ _id: req.query.id })
        .then((data) => {
            res.send({
                mas: "Course Deleted Successfully",
                data: data
                })
                })
                .catch((err) => {
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

const updateInstitute_Course=()=>{
    try{
        Institutesmodel.updateOne({ _id: req.query.id }, req.body )
        .then((data) => {
            res.send({
                mas: "Course Updated Successfully",
                data: data  
                })
                })
                .catch((err) => {
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

module.exports={postInstitute_Course,getInstitute_Course,getInstituteCourse_ByID,deleteInstitute_Course,updateInstitute_Course};







