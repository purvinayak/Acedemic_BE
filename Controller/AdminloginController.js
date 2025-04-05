
// const express = require("express");
// const { usermodel, REgmodel } = require("../Model/Loginmodel");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;

// const regpost = async (req, res) => {
//   try {
//     const data = req.body;
//     const { password } = data;

//     if (!password) {
//       return res.status(400).send({ message: "Password is required" });
//     }
//     const validation = REgmodel.validate(data);
//     if (validation.error) {
//       return res.status(400).send({ message: "Invalid Data", details: validation.error.details });
//     }

//     const hashedPassword = await bcrypt.hash(password, saltRounds);


//     const newUser = new usermodel({ ...data, password: hashedPassword });

 
//     const savedUser = await newUser.save();

//     res.status(201).send({
//       message: "Data received",
//       isSuccess: true,
//       data: savedUser,
//     });
//   } catch (err) {
//     console.error("Error while saving data:", err);
//     res.status(500).send({
//       message: "An error occurred while saving data",
//       isSuccess: false,
//       error: err.message,
//     });
//   }
// };

// module.exports = regpost;




// const express = require("express");
// const { usermodel, REgmodel } = require("../Model/Loginmodel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const saltRounds = 10;
// const JWT_SECRET = "your_jwt_secret_key";

// const regpost = async (req, res) => {
//   try {
//     const data = req.body;
//     const { password } = data;

//     if (!password) {
//       return res.status(400).send({ message: "Password is required" });
//     }
//     const validation = REgmodel.validate(data);
//     if (validation.error) {
//       return res.status(400).send({ message: "Invalid Data", details: validation.error.details });
//     }

//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const newUser = new usermodel({ ...data, password: hashedPassword });

//     const savedUser = await newUser.save();

//     res.status(201).send({
//       message: "Data received",
//       isSuccess: true,
//       data: savedUser,
//     });
//   } catch (err) {
//     console.error("Error while saving data:", err);
//     res.status(500).send({
//       message: "An error occurred while saving data",
//       isSuccess: false,
//       error: err.message,
//     });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user by email
//     const user = await usermodel.findOne({ email });
//     if (!user) {
//       return res.status(401).send({ message: "Invalid email or password" });
//     }

//     // Verify password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).send({ message: "Invalid email or password" });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.status(200).send({
//       message: "Login successful",
//       isSuccess: true,
//       token,
//     });
//   } catch (err) {
//     console.error("Error during login:", err);
//     res.status(500).send({
//       message: "An error occurred during login",
//       isSuccess: false,
//       error: err.message,
//     });
//   }
// };

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     return res.status(401).send({ message: "Access token required" });
//   }

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).send({ message: "Invalid or expired token" });
//     }
//     req.user = user;
//     next();
//   });
// };

// const logout = async (req, res) => {

//   res.status(200).send({
//     message: "Logged out successfully",
//     isSuccess: true,
//   });
// };

// module.exports = { regpost, login, logout, authenticateToken };
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const adminModel = require('../Model/adminModel');

// const saltRounds = 10;
// const JWT_SECRET = "your_admin_jwt_secret_key";

// const adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validate input
//     if (!email || !password) {
//       return res.status(400).send({ message: "Email and password are required" });
//     }

//     // Find admin by email
//     const admin = await adminModel.findOne({ email });
//     if (!admin) {
//       return res.status(401).send({ message: "Invalid email or password" });
//     }

//     // Verify password
//     const isPasswordValid = await bcrypt.compare(password, admin.password);
//     if (!isPasswordValid) {
//       return res.status(401).send({ message: "Invalid email or password" });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.status(200).send({
//       message: "Login successful",
//       isSuccess: true,
//       token,
//     });
//   } catch (err) {
//     console.error("Error during admin login:", err);
//     res.status(500).send({
//       message: "An error occurred during login",
//       isSuccess: false,
//       error: err.message,
//     });
//   }
// };

// module.exports = { adminLogin };
const express=require("express");
const { AdminLoginModel } = require('../Model/AdminLoginModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const createAdmin = async () => {
    try {
        // Check if the admin already exists
        const existingAdmin = await AdminLoginModel.findOne({ email: 'admin@example.com' });
        if (existingAdmin) {
            console.log('Admin user already exists');
            return;
        }
        
        // Hash the password
        const hashedPassword = await bcrypt.hash('your_admin_password', 10);

        // Create a new admin instance
        const admin = new AdminLoginModel({ email: 'admin@example.com', password: hashedPassword });

        // Save the admin to the database
        await admin.save();
        console.log('Admin user created successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error creating admin:', error);
    }
};

// Admin login function
const AdminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find admin by email
        const admin = await AdminLoginModel.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: admin._id, email: admin.email }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

module.exports = { createAdmin ,AdminLogin };