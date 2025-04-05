const mongoose = require('mongoose');
const Joi = require('joi');

const BatchSchema = new mongoose.Schema({
  batchName: {
    type: String,
    required: true
  },
  selectedCourse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institute_Course',
    required: true
  },
  selectedStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InstituteStudent'
  }],
  batchTime: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  
});
const batchValidation = Joi.object({
  batchName: Joi.string().required(),
  selectedCourse: Joi.string().required(),
  selectedStudents: Joi.array().items(Joi.string()),
  batchTime: Joi.string().required(),
  duration: Joi.string().required()
});
const BatchModel = mongoose.model('Batch', BatchSchema);
module.exports = { BatchModel,batchValidation };
