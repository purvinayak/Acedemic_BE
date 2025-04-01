const express = require("express");
// const app=express();

const router = express.Router();

const {postAdmin_Institute}=require("../Controller/AdminController");
const { getAdmin_Institute, deleteAdmin_Institute,updateAdmin_Institute } = require("../Controller/AdminController");
// const { required } = require("joi");
// const { adminLogin } = require("../Controller/AdminloginController");
const middleware =(req, res,next) => {
    if(next){
        console.log("in middleware");
    next() 
    }
   else{
    res.send("error")
   }
   }
// router.post("/adminLogin",adminLogin);
router.post("/postAdmin_Institute",postAdmin_Institute);
router.get("/getAdmin_Institute",getAdmin_Institute);
router.delete("/deleteAdmin_Institute",deleteAdmin_Institute);
router.put("/updateAdmin_Institute",updateAdmin_Institute);


module.exports = router;


