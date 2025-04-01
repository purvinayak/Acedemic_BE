// const { BatchModel } = require('../Model/BatchModel');
// const express = require('express');
// // const postBatch = async (req, res) => {
// //     try {
// //       console.log("Received batch data:", req.body);
// //       const batch = new BatchModel(req.body);
// //       await batch.save();
// //       const populatedBatch = await BatchModel.findById(batch._id)
// //         .populate('StudentName')
// //         .populate('Course_Name');
  
// //       res.status(201).json({
// //         message: "Batch created successfully",
// //         data: populatedBatch
// //       });
// //     } catch (err) {
// //       console.error("Error creating batch:", err);
// //       res.status(500).json({
// //         message: "Error creating batch",
// //         error: err.message
// //       });
// //     }
// //   };
// // const getBatch = async (req, res) => {
// //   try {
// //     const batches = await BatchModel.find()
// //       .populate('Course_Name')
// //       .populate('StudentName');
// //     res.status(200).json({
// //       message: "Batches fetched successfully",
// //       data: batches
// //     });
// //   } catch (err) {
// //     res.status(500).json({
// //       message: "Error fetching batches",
// //       error: err.message
// //     });
// //   }
// // };

// const postBatch = async (req, res) => {
//     try {
//       const { error } = batchValidationSchema.validate(req.body);
//       if (error) {
//         return res.status(400).json({ message: error.details[0].message });
//       }
  
//       const batch = new BatchModel(req.body);
//       await batch.save();
  
//       const populatedBatch = await BatchModel.findById(batch._id)
//         .populate("selectedCourse")
//         .populate("selectedStudents");
  
//       res.status(201).json({
//         message: "Batch created successfully",
//         data: populatedBatch
//       });
//     } catch (err) {
//       console.error("Error creating batch:", err);
//       res.status(500).json({
//         message: "Error creating batch",
//         error: err.message
//       });
//     }
//   };

//   const getBatch = async (req, res) => {
//     try {
//       const batches = await BatchModel.find()
//         .populate({
//           path: 'selectedCourse',
//           select: 'Course_Name duration fees'
//         })
//         .populate({
//           path: 'selectedStudents',
//           select: 'StudentName Email MobileNo'
//         });
  
//       res.status(200).json({
//         message: "Batches fetched successfully",
//         data: batches
//       });
//     } catch (err) {
//       console.error("Error fetching batches:", err);
//       res.status(500).json({
//         message: "Error fetching batches",
//         error: err.message
//       });
//     }
//   };
// const deleteBatch = async (req, res) => {
//     try {
//       await BatchModel.findByIdAndDelete(req.query.id);
//       res.status(200).json({
//         message: "Batch deleted successfully"
//       });
//     } catch (err) {
//       res.status(500).json({
//         message: "Error deleting batch",
//         error: err.message
//       });
//     }
//   };
// module.exports = { postBatch, getBatch,deleteBatch};

const { BatchModel,batchValidation } = require('../Model/Batchmodel'); // Fix the path

// const createBatch = async (req, res) => {
//   try {
//     const batch = new BatchModel(req.body);
//     await batch.save();
    
//     const populatedBatch = await BatchModel.findById(batch._id)
//       .populate('selectedCourse', 'Course_Name')
//       .populate('selectedStudents', 'StudentName Email');

//     res.status(201).json({
//       success: true,
//       message: 'Batch created successfully',
//       data: populatedBatch,
    
//     });
    
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error creating batch',
//       error: error.message
//     });
//   }
// };
const createBatch = async (req, res) => {
  try {
    const { error } = batchValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const batch = new BatchModel(req.body);
    await batch.save();
    const populatedBatch = await BatchModel.findById(batch._id)
      .populate('selectedCourse', 'Course_Name')
      .populate('selectedStudents', 'StudentName Email');
      res.status(201).json({
        success: true,
        message: 'Batch created successfully',
        data: populatedBatch
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating batch',
      error: error.message
    });
  }
};



// const getBatches = async (req, res) => {
//   try {
//     const batches = await BatchModel.find()
//       .populate('selectedCourse', 'Course_Name')
//       .populate('selectedStudents', 'StudentName Email');

//     res.status(200).json({
//       success: true,
//       data: batches
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching batches',
//       error: error.message
//     });
//   }
// };
const getBatches = async (req, res) => {
  try {
    console.log('Fetching batches...'); // Debug log
    
    const batches = await BatchModel.find()
      .populate({
        path: 'selectedCourse',
        select: 'Course_Name duration fees',
        model: 'Institute_Course' // Explicitly specify the model
      })
      .populate({
        path: 'selectedStudents',
        select: 'StudentName Email',
        model: 'InstituteStudent' // Explicitly specify the model
      });

    console.log('Fetched batches:', batches); // Debug log

    res.status(200).json({
      success: true,
      data: batches
    });
  } catch (error) {
    console.error('Error in getBatches:', error); // Debug log
    res.status(500).json({
      success: false,
      message: 'Error fetching batches',
      error: error.message
    });
  }
};
const updateBatch = async (req, res) => {
  try {
    const batch = await BatchModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('selectedCourse selectedStudents');

    if (!batch) {
      return res.status(404).json({
        success: false,
        message: 'Batch not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Batch updated successfully',
      data: batch
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating batch',
      error: error.message
    });
  }
};

const deleteBatch = async (req, res) => {
  try {
    const batch = await BatchModel.findByIdAndDelete(req.params.id);
    
    if (!batch) {
      return res.status(404).json({
        success: false,
        message: 'Batch not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Batch deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting batch',
      error: error.message
    });
  }
};

module.exports = { createBatch, getBatches, updateBatch, deleteBatch };