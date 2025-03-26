//this is a registration login model //
const mongoose = require('mongoose');
const Joi = require('joi');

let Reg = new mongoose.Schema({
    Username: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})
let REgmodel = Joi.object({
    Username: Joi.string()
        .min(3)
        .max(30)
        .required(),
    mobile: Joi.number()
        .min(10)
        .required(),
    email: Joi.string()
        .min(6)
        .max(50)
        .email()
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
}).options({ allowUnknown: true });

let usermodel = mongoose.model('Reg', Reg);
module.exports = { usermodel, REgmodel };