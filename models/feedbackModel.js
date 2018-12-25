const Joi = require('joi');
const mongosse = require('mongoose');
const express = require('express');
const router = express.Router();

const Feedback = mongosse.models('Feedback', new mongosse.Schema({
    feedback_no: {
        required: true,
        type: Number
    },


}));

function validateCustomer(feedback) {
    const feedbackSchema = {
        
    }

    return Joi.validate(feedback, feedbackSchema);
}