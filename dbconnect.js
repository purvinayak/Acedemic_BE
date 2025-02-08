const mongoose=require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MongoURL).then(()=>{
    console.log("Connected to MongoDB");
    }).catch((err)=>{
        console.log( "Error connecting mongoo_db",err);
        })
    




