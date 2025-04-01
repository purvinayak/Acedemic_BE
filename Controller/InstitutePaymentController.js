
// // module.exports={ postPayment,updatePayment , deletePayment}
// const { InstitutePaymentModel } = require("../Model/InstituteStudentModel");
// const express=require("express");
// // const postPayment = async (req, res) => {
// //   try {
// //     const data = req.body;
// //     const newPayment = new InstitutePaymentModel(data);
// //     await newPayment.save();
// //     res.status(201).send({
// //       mas: "Payment Added Successfully",
// //       data: newPayment,
// //     });
// //   } catch (err) {
// //     res.status(500).send({
// //       mas: "Error Occurred",
// //       err: err.message,
// //     });
// //   }
// // };

// const updatePayment = async (req, res) => {
//   try {
//     const updatedPayment = await InstitutePaymentModel.findByIdAndUpdate(
//       req.query.id,
//       req.body,
//       { new: true }
//     );
//     res.status(200).send({
//       mas: "Payment Updated Successfully",
//       data: updatedPayment,
//     });
//   } catch (err) {
//     res.status(500).send({
//       mas: "Error Occurred",
//       err: err.message,
//     });
//   }
// };

//     const deletePayment=(req,res)=>{
//         try{
//             InstitutePaymentModel.deleteOne({ _id: req.query.id })
//             .then((data) => {
//                 res.send({
//                   mas: "Student Deleted Successfully",
//                   data: data
//                   })
//                 }).catch((err) => {
//                     res.send({
//                     mas: err.message
//                     })
//                 })
//             }
//     catch(err){
//         res.send({
//         mas:err.message
//         })
//     }
//     }



    
// module.exports = { updatePayment,deletePayment };
const { InstituteStudentModel } = require("../Model/InstituteStudentModel");
const express = require("express");

// Add a new payment
// const postPayment = async (req, res) => {
//   try {
//     const { id, CurrentFees } = req.body;

//     // Fetch the student record
//     const student = await InstituteStudentModel.findById(id);
//     if (!student) {
//       return res.status(404).send({
//         msg: "Student not found",
//       });
      
//     }

   
//     const updatedRecievedFees = (student.RecievedFees || 0) + CurrentFees;
//     const updatedRemainingFees = student.DecidedFees - updatedRecievedFees;

//     // Update the student record
//     const updatedStudent = await InstituteStudentModel.findByIdAndUpdate(
//       id,
//       {
//         RecievedFees: updatedRecievedFees,
//         RemainingFees: updatedRemainingFees,
//       },
//       { new: true }
//     );

//     res.status(201).send({
//       msg: "Payment Added Successfully",
//       data: updatedStudent,
//     });
//     console.log("Payment added successfully:", updatedStudent);
//   } catch (err) {
//     console.error("Error adding payment:", err);
//     res.status(500).send({
//       msg: "Internal Server Error",
//       error: err.message,
//     });
//   }
// };
const postPayment = async (req, res) => {
    try {
      const { id, CurrentFees } = req.body;
  
      // Log the CurrentFees value
      console.log("Current Fees Received:", CurrentFees);
  
      // Fetch the student record
      const student = await InstituteStudentModel.findById(id);
      if (!student) {
        return res.status(404).send({
          msg: "Student not found",
        });
      }
  
      // Calculate updated RecievedFees and RemainingFees
      const updatedRecievedFees = (student.RecievedFees || 0) + CurrentFees;
      const updatedRemainingFees = student.DecidedFees - updatedRecievedFees;
  
      // Update the student record
      const updatedStudent = await InstituteStudentModel.findByIdAndUpdate(
        id,
        {
          RecievedFees: updatedRecievedFees,
          RemainingFees: updatedRemainingFees,
        },
        { new: true }
      );
  
      res.status(201).send({
        msg: "Payment Added Successfully",
        data: updatedStudent,
      });
      console.log("Payment added successfully:", updatedStudent);
    } catch (err) {
      console.error("Error adding payment:", err);
      res.status(500).send({
        msg: "Internal Server Error",
        error: err.message,
      });
    }
  };
// Update payment details
const updatePayment = async (req, res) => {
  try {
    const updatedPayment = await InstituteStudentModel.findByIdAndUpdate(
      req.query.id,
      req.body,
      { new: true }
    );
    res.status(200).send({
      msg: "Payment Updated Successfully",
      data: updatedPayment,
    });
    console.log("Payment updated successfully:", updatedPayment);
  } catch (err) {
    res.status(500).send({
      msg: "Error Occurred",
      error: err.message,
    });
  }
};

// Delete a payment
const deletePayment = async (req, res) => {
  try {
    const deletedPayment = await InstituteStudentModel.findByIdAndDelete(req.query.id);
    if (!deletedPayment) {
      return res.status(404).send({
        msg: "Payment not found",
      });
    }
    res.status(200).send({
      msg: "Payment Deleted Successfully",
      data: deletedPayment,
    });
  } catch (err) {
    res.status(500).send({
      msg: "Error Occurred",
      error: err.message,
    });
  }
};

module.exports = { postPayment, updatePayment, deletePayment };