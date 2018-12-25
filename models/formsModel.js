const Joi = require('joi');
const mongosse = require('mongoose');
const express = require('express');
const router = express.Router();

const Forms = mongosse.models('Forms', new mongosse.Schema({
    form_no: {
        required: true,
        type: Number
    },


}));

function validateCustomer(forms) {
    const formSchema = {
        
    }

    return Joi.validate(forms, formSchema);
}