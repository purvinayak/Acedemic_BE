const express=require("express");
var cors=require('cors');
const app=express();
app.use(express.json());
app.use(cors());

require("dotenv").config();
require("./dbconnect");

const AdminRouter=require('./Router/AdminRouter');
console.log(typeof AdminRouter);
app.use("/admin",AdminRouter);

const InstituteRouter=require('./Router/InstituteRouter');
console.log(typeof InstituteRouter );
app.use("/institute",InstituteRouter);

app.listen(process.env.PORT,(err)=>{
   if(!err){
    console.log("Server is running on port 9000");
   }
   else{
    console.log("Error in server");
   }
});
