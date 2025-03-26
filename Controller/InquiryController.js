
const express = require("express");
// const Institutesmodel = require("../Model/Institutemodel")
const { Institutesmodel, Institute } = require("../Model/Institutemodel");

const postInstitute_Course = (req, res) => {
    try {
        const data = req.body;

        const validate = Institute.validate(data, { allowUnknown: true });
        if (validate.error) {
            console.log("Validation Error Details:", validate.error.details);
            return res.status(400).send({
                mas: "Invalid data",
                details: validate.error.details, // Detailed validation errors
                isSuccess: false,
            });
        }

        // Create a Mongoose instance only after validation passes
        const newInstitute = new Institutesmodel(data);
        newInstitute.save()
            .then(() => {
                res.status(201).send({
                    mas: "Text Added Successfully",
                    data: newInstitute,
                    isSuccess: true,
                });
            })
            .catch((err) => {
                res.status(500).send({
                    mas: "Error Occurred",
                    err: err,
                    isSuccess: false,
                });
            });
    } catch (err) {
        res.status(500).send({
            mas: "Error Occurred",
            err: err,
        });
    }
};



const getInstitute_Course = (req, res) => {
    try {
        Institutesmodel.find().then((data) => {
            res.send({
                mas: "Course Added Successfully",
                data: data
            })
        }).catch((err) => {
            res.send({
                mas: err.message
            })
        })
    }
    catch (err) {
        res.send({
            mas: err.message

        })
    }
}

const getInstituteCourse_ByID = (req, res) => {
    try {
        Institutesmodel.findOne({ _id: req.query.id })
            .then((data) => {
                res.send({
                    mas: "Course Added Successfully",
                    data: data
                })
            })
            .catch((err) => {
                res.send({
                    mas: err.message
                })
            })
    }
    catch (err) {
        res.send({
            mas: err.message
        })

    }

}

const deleteInstitute_Course = (req, res) => {
    try {
        Institutesmodel.deleteOne({ _id: req.query.id })
            .then((data) => {
                res.send({
                    mas: "Course Deleted Successfully",
                    data: data
                })
            })
            .catch((err) => {
                res.send({
                    mas: err.message
                })
            })
    }
    catch (err) {
        res.send({
            mas: err.message
        })
    }
}

const updateInstitute_Course = (req, res) => {
    try {
        Institutesmodel.updateOne({ _id: req.query.id }, req.body)
            .then((data) => {
                res.send({
                    mas: "Course Updated Successfully",
                    data: data
                })
            })
            .catch((err) => {
                res.send({
                    mas: err.message
                })
            })
    }
    catch (err) {
        res.send({
            mas: err.message
        })
    }
}

module.exports = { postInstitute_Course, getInstitute_Course, getInstituteCourse_ByID, deleteInstitute_Course, updateInstitute_Course }