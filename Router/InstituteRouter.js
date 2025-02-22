

const express=require("express")
const router=express.Router();

const{postInstitute_Course,getInstitute_Course,getInstituteCourse_ByID,deleteInstitute_Course,updateInstitute_Course}=require("../Controller/InstituteCourseController");

router.post("/postInstitute_Course",postInstitute_Course);
router.get("/getInstitute_Course",getInstitute_Course);
router.get("/getInstituteCourse_ByID",getInstituteCourse_ByID);
router.put("/updateInstitute_Course",updateInstitute_Course);
router.delete("/deleteInstitute_Course",deleteInstitute_Course);

module.exports=router;



