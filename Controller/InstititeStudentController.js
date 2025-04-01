// const express=require("express");
// const {InstituteStudentModel, InstituteStudentSchema}=require("../Model/InstituteStudentModel")

// const postStudent = async (req, res) => {
//     try {
//         let data = req.body;
//         console.log("Received Data:", data);

//         if (data.mobileNo) {
//             data.MobileNo = data.mobileNo;
//             delete data.mobileNo;
//         }
//         if (!data.MobileNo) {
//             return res.status(400).json({
//                 msg: "MobileNo is required",
//                 isSuccess: false
//             });
//         }
//         const validate = InstituteStudentSchema.validate(data, { allowUnknown: true });
//         if (validate.error) {
//             console.log("Validation Error Details:", validate.error.details);
//             return res.status(400).json({
//                 msg: "Invalid data",
//                 details: validate.error.details,
//                 isSuccess: false,
//             });
//         }
//         const newInstitute = new InstituteStudentModel(data);
//         await newInstitute.save();
//         return res.status(201).json({
//             msg: "Student Added Successfully",
//             data: newInstitute,
//             isSuccess: true,
//         });

//     } catch (err) {
//         console.error("Error Occurred:", err);
//         return res.status(500).json({
//             msg: "Internal Server Error",
//             error: err.message,
//             isSuccess: false,
//         });
//     }
// };

// const getStudent=(req,res)=>{
//     try{
//         InstituteStudentModel.find().then((data)=>{
//             res.send({
//             mas:"Student find Successfully",
//             data:data
//             })
//         }).catch((err)=>{
//             res.send({
//             mas:err.message
//             })
//             })
//     }
//     catch(err){
//         res.send({
//         mas:err.message
        
//         })

//     }
// }
// // const getStudent = async (req, res) => {
// //     try {
// //         // Fetch all students from the database
// //         const students = await InstituteStudentModel.find();

// //         // Enrich the data with calculated fields (e.g., RemainingFees)
// //         const enrichedStudents = students.map((student) => {
// //             const decidedFees = student.DecidedFees || 0; // Default to 0 if not present
// //             const recievedFees = student.RecievedFees || 0; // Default to 0 if not present
// //             const remainingFees = decidedFees - recievedFees;

// //             return {
// //                 ...student._doc, // Spread the original student data
// //                 RemainingFees: remainingFees, // Add the calculated RemainingFees field
// //             };
// //         });

// //         // Send the enriched data as the response
// //         res.status(200).send({
// //             msg: "Students fetched successfully",
// //             data: enrichedStudents,
// //         });
// //     } catch (err) {
// //         console.error("Error fetching students:", err);
// //         res.status(500).send({
// //             msg: "Internal Server Error",
// //             error: err.message,
// //         });
// //     }
// // };
// const getByIdStudent=(req,res)=>{
//     try{
//         InstituteStudentModel.findOne({_id:req.query.id})
//        .then((data)=>{
//         res.send({
//             mas:"Student find Successfully",
//             data:data
//             })
//        }).catch((err)=>{
//             res.send({
//             mas:err.message
//             })
//         })
//     }
//     catch(err){
//         res.send({
//         mas:err.message
//         })

//     }

// }

// const updateStudent=(req,res)=>{
// try{
//     InstituteStudentModel.updateOne({ _id: req.query.id }, req.body )
     
//     .then((data) => {    
//         res.send({
//             mas: "Student Updated Successfully",
//             data: data  
//             })
//         }).catch((err) => {
//             res.send({
//                 mas: err.message
//             })
//         })
//     }
//     catch(err){
//         res.send({
//         mas:err.message
//         })
//     }
// }

// const deleteStudent=(req,res)=>{
//     try{
//         InstituteStudentModel.deleteOne({ _id: req.query.id })
//         .then((data) => {
//             res.send({
//               mas: "Student Deleted Successfully",
//               data: data
//               })
//             }).catch((err) => {
//                 res.send({
//                 mas: err.message
//                 })
//             })
//         }
// catch(err){
//     res.send({
//     mas:err.message
//     })
// }
// }


// module.exports={postStudent,getStudent,getByIdStudent,updateStudent,deleteStudent}

const express = require("express");
const { InstituteStudentModel, InstituteStudentSchema } = require("../Model/InstituteStudentModel");

// Add a new student
// const postStudent = async (req, res) => {
//   try {
//     let data = req.body;
//     console.log("Received Data:", data);

//     // Ensure MobileNo is properly handled
//     if (data.mobileNo) {
//       data.MobileNo = data.mobileNo;
//       delete data.mobileNo;
//     }
//     if (!data.MobileNo) {
//       return res.status(400).json({
//         msg: "MobileNo is required",
//         isSuccess: false,
//       });
//     }

//     // Calculate RemainingFees
//     data.RemainingFees = data.DecidedFees - (data.RecievedFees || 0);

//     // Validate the data
//     const validate = InstituteStudentSchema.validate(data, { allowUnknown: true });
//     if (validate.error) {
//       console.log("Validation Error Details:", validate.error.details);
//       return res.status(400).json({
//         msg: "Invalid data",
//         details: validate.error.details,
//         isSuccess: false,
//       });
//     }

//     // Save the student data
//     const newStudent = new InstituteStudentModel(data);
//     await newStudent.save();
//     return res.status(201).json({
//       msg: "Student Added Successfully",
//       data: newStudent,
//       isSuccess: true,
//     });
//   } catch (err) {
//     console.error("Error Occurred:", err);
//     return res.status(500).json({
//       msg: "Internal Server Error",
//       error: err.message,
//       isSuccess: false,
//     });
//   }
// };
const postStudent = async (req, res) => {
    try {
      let data = req.body;
      console.log("Received Data in Backend:", data); // Log the received data
  
      // Ensure MobileNo is properly handled
      if (data.mobileNo) {
        data.MobileNo = data.mobileNo;
        delete data.mobileNo;
      }
      if (!data.MobileNo) {
        return res.status(400).json({
          msg: "MobileNo is required",
          isSuccess: false,
        });
      }
  
      // Calculate RemainingFees
      data.RemainingFees = data.DecidedFees - (data.RecievedFees || 0);
  
      // Validate the data
      const validate = InstituteStudentSchema.validate(data, { allowUnknown: true });
      if (validate.error) {
        console.log("Validation Error Details:", validate.error.details);
        return res.status(400).json({
          msg: "Invalid data",
          details: validate.error.details,
          isSuccess: false,
        });
      }
  
      // Save the student data
      const newStudent = new InstituteStudentModel(data);
      await newStudent.save();
      console.log("Student Saved Successfully:", newStudent); // Log the saved data
      return res.status(201).json({
        msg: "Student Added Successfully",
        data: newStudent,
        isSuccess: true,
      });
    } catch (err) {
      console.error("Error Occurred in Backend:", err);
      return res.status(500).json({
        msg: "Internal Server Error",
        error: err.message,
        isSuccess: false,
      });
    }
  };
// Get all students
// const getStudent = async (req, res) => {
//   try {
//     const students = await InstituteStudentModel.find();
//     res.status(200).send({
//       msg: "Students fetched successfully",
//       data: students,
//     });
//   } catch (err) {
//     console.error("Error fetching students:", err);
//     res.status(500).send({
//       msg: "Internal Server Error",
//       error: err.message,
//     });
//   }
// };
const getStudent = async (req, res) => {
    try {
      // Fetch all students from the database
      const students = await InstituteStudentModel.find().
      populate('Course', 'Course_Name _id') // Populate course details
     
      // Enrich the data with calculated fields (e.g., RemainingFees)
      const enrichedStudents = students.map((student) => {
        const decidedFees = student.DecidedFees || 0; // Default to 0 if not present
        const recievedFees = student.RecievedFees || 0; // Default to 0 if not present
        const remainingFees = decidedFees - recievedFees;
  
        return {
          ...student._doc, // Spread the original student data
          RecievedFees: recievedFees,
          RemainingFees: remainingFees,
        };
      });
  
      // Send the enriched data as the response
      res.status(200).send({
        msg: "Students fetched successfully",
        data: enrichedStudents,
      });
    } catch (err) {
      console.error("Error fetching students:", err);
      res.status(500).send({
        msg: "Internal Server Error",
        error: err.message,
      });
    }
  };
// Get a student by ID
const getByIdStudent = async (req, res) => {
  try {
    const student = await InstituteStudentModel.findOne({ _id: req.query.id });
    if (!student) {
      return res.status(404).send({
        msg: "Student not found",
      });
    }
    res.status(200).send({
      msg: "Student fetched successfully",
      data: student,
    });
  } catch (err) {
    console.error("Error fetching student:", err);
    res.status(500).send({
      msg: "Internal Server Error",
      error: err.message,
    });
  }
};

// Update a student
// const updateStudent = async (req, res) => {
//   try {
//     const { id } = req.query;
//     const updateData = req.body;

//     // Fetch the existing student record
//     const student = await InstituteStudentModel.findById(id);
//     if (!student) {
//       return res.status(404).send({
//         msg: "Student not found",
//       });
//     }

//     // Update RecievedFees and recalculate RemainingFees if needed
//     if (updateData.RecievedFees !== undefined) {
//       updateData.RemainingFees = student.DecidedFees - updateData.RecievedFees;
//     }

//     // Update the student record
//     const updatedStudent = await InstituteStudentModel.findByIdAndUpdate(id, updateData, { new: true });
//     res.status(200).send({
//       msg: "Student Updated Successfully",
//       data: updatedStudent,
//     });
//   } catch (err) {
//     console.error("Error updating student:", err);
//     res.status(500).send({
//       msg: "Internal Server Error",
//       error: err.message,
//     });
//   }
// };
const updateStudent = async (req, res) => {
    try {
      const { id } = req.query;
      const updateData = req.body;
  
      // Fetch the existing student record
      const student = await InstituteStudentModel.findById(id);
      if (!student) {
        return res.status(404).send({
          msg: "Student not found",
        });
      }
  
      // Update RecievedFees and recalculate RemainingFees if needed
      if (updateData.RecievedFees !== undefined) {
        updateData.RemainingFees = student.DecidedFees - updateData.RecievedFees;
      }
  
      // Update the student record
      const updatedStudent = await InstituteStudentModel.findByIdAndUpdate(id, updateData, { new: true });
      res.status(200).send({
        msg: "Student Updated Successfully",
        data: updatedStudent,
      });
    } catch (err) {
      console.error("Error updating student:", err);
      res.status(500).send({
        msg: "Internal Server Error",
        error: err.message,
      });
    }
  };
// Delete a student
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.query;

    // Delete the student record
    const deletedStudent = await InstituteStudentModel.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).send({
        msg: "Student not found",
      });
    }

    res.status(200).send({
      msg: "Student Deleted Successfully",
      data: deletedStudent,
    });
  } catch (err) {
    console.error("Error deleting student:", err);
    res.status(500).send({
      msg: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = { postStudent, getStudent, getByIdStudent, updateStudent, deleteStudent };