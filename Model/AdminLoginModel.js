
const mongoose = require('mongoose');

const AdminLoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
         
    },
    password: {
        type: String,
        required: true,
    },
});

const AdminLoginModel = mongoose.model('AdminLogin', AdminLoginSchema);

module.exports = { AdminLoginModel };