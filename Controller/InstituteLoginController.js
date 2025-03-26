const express=require("express");
const {usermodel,REgmodel}=require('../Model/Regmodel');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const planetex ='s0/\/\P4$$w0rD';
var jwt = require('jsonwebtoken');

const regpost=(req,res)=>{
    try{
        let data = req.body;
        const { password} = data; 
        if (!password) {
            return res.status(400).send({ message: "Password is required" });
        }
        let Exp = new usermodel(data);
        let validate=REgmodel.validate(Exp);
        console.log("validate---",JSON.stringify(validate));
        if (validate.error) {
            return res.status(400).send({ message: "Invalid Data" });
        }
        console.log("Plaintext password during login:", req.body.password);
        console.log("Hashed password from database:", data.password);
        
            // const planetex=data.password;
            const hashdata=bcrypt.hashSync(planetex, saltRounds);
            Exp.password=hashdata;

            
        Exp.save().then((data)=>{
            res.status(201).send({
                mas:"data recieved",
            isSuccess:true ,
            data:data
          
            })
        }).catch((err)=>{
            console.log('3',err)
            res.status(500).send({
                msg:"error while saving data",
                isSuccess:false,
                err:err
                })
        })
    }
catch(err){
    res.status(500).send({message:err.message});
    }
}

 const getbyid = (req, res) => {
try{
    usermodel.findOne({email:req.body.email})
        .then((data)=>{
            console.log(data,"1212")
              const hash=bcrypt.compareSync(planetex,data.password);
              console.log(hash,"1212")
                if(hash){
                    console.log("999")
                   let obj={
                    Username:data.Username,
                    mobileNo:data.mobile,
                    email:data.email,
                    // password:data.password
                   }
                    let token=jwt.sign(obj,'hjuyr');
                    res.status(200).send({message:"login success",isSuccess:true,token})
                    }
                    else{
                        res.status(400).send({message:"invalid password",isSuccess:false})
                        }
        
        })
}
    catch(err){
        res.status(500).send({message:err.message});
        }
}

const userpost=(req,res)=>{
res.send({
    message:"user post",
})
}

module.exports={regpost,getbyid,userpost};