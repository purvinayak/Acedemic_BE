

const express=require("express")
const router=express.Router();

const{postInstitute_Course,getInstitute_Course,deleteInstitute_Course,updateInstitute_Course}=require("../Controller/InstituteCourseController");

router.post("/postInstitute_Course",postInstitute_Course);
router.get("/getInstitute_Course",getInstitute_Course);

router.put("/updateInstitute_Course",updateInstitute_Course);
router.delete("/deleteInstitute_Course",deleteInstitute_Course);


const{regpost,getbyid,userpost}=require('../Controller/InstituteLoginController');
const{auth}=require('../Middleware/Authentication');

router.post("/regpost",regpost);
router.post("/getbyid",getbyid);
router.post("/userpost",auth,userpost);

const {postInquiry,getInquiry,deleteInquiry}=require("../Controller/InstituteInquiryController");
router.post("/postInquiry",postInquiry);
router.get("/getInquiry",getInquiry);
router.delete("/deleteInquiry",deleteInquiry);



// const {postStudent,getStudent,deleteStudent,getByStudent,updateStudent}=require("../Controller/InstituteStudentController");
// router.post("/postStudent",postStudent);
// router.get("/getStudent",getStudent);
// router.delete("/deleteStudent",deleteStudent);
// router.get("/getByStudent",getByStudent);
// router.put("/updateStudent",updateStudent);

module.exports=router;






