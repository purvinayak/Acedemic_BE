

const express=require("express")
const router=express.Router();
//this is for institute
const{postInstitute_Course,getInstitute_Course,deleteInstitute_Course,updateInstitute_Course,getInstituteCourseid}=require("../Controller/InstituteCourseController");

router.post("/postInstitute_Course",postInstitute_Course);
router.get("/getInstitute_Course",getInstitute_Course);
router.get("/getInstituteCourseid",getInstituteCourseid);
router.put("/updateInstitute_Course",updateInstitute_Course);
router.delete("/deleteInstitute_Course",deleteInstitute_Course);


const{regpost,getbyid,userpost}=require('../Controller/InstituteLoginController');
const{auth}=require('../Middleware/Authentication');

router.post("/regpost",regpost);
router.post("/getbyid",getbyid);
router.post("/userpost",auth,userpost);

//this is for payment
const {postInquiry,getInquiry,deleteInquiry}=require("../Controller/InstituteInquiryController");
router.post("/postInquiry",postInquiry);
router.get("/getInquiry",getInquiry);
router.delete("/deleteInquiry",deleteInquiry);


//this is for student
const {postStudent,getStudent,deleteStudent,getByIdStudent,updateStudent}=require("../Controller/InstititeStudentController");
router.post("/postStudent",postStudent);
router.get("/getStudent",getStudent);
router.delete("/deleteStudent",deleteStudent);
router.get("/getByStudent",getByIdStudent);
router.put("/updateStudent",updateStudent);

//this is for payment
const { updatePayment,deletePayment,postPayment} = require("../Controller/InstitutePaymentController");


router.put("/updatePayment", updatePayment);
router.delete("/deletePayment", deletePayment);
router.post("/postPayment", postPayment);

// router.get("/getPayments",getPayments)

//this is for batch 
const {createBatch,getBatches,deleteBatch ,updateBatch } = require("../Controller/BatchController");
router.post("/createBatch", createBatch);   
router.get("/getBatches", getBatches);
router.delete("/deleteBatch/:id", deleteBatch);
router.put("/updateBatch/:id", updateBatch);

module.exports=router;






