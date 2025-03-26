
const express = require("express");
const { usermodel, REgmodel } = require("../Model/Loginmodel");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const regpost = async (req, res) => {
  try {
    const data = req.body;
    const { password } = data;

    if (!password) {
      return res.status(400).send({ message: "Password is required" });
    }
    const validation = REgmodel.validate(data);
    if (validation.error) {
      return res.status(400).send({ message: "Invalid Data", details: validation.error.details });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);


    const newUser = new usermodel({ ...data, password: hashedPassword });

 
    const savedUser = await newUser.save();

    res.status(201).send({
      message: "Data received",
      isSuccess: true,
      data: savedUser,
    });
  } catch (err) {
    console.error("Error while saving data:", err);
    res.status(500).send({
      message: "An error occurred while saving data",
      isSuccess: false,
      error: err.message,
    });
  }
};

module.exports = regpost;
