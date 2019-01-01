const Joi = require('joi');
const mongosse = require('mongoose');
const express = require('express');
const router = express.Router();

const Student = mongosse.models('Student', new mongosse.Schema({
    


}));

function validateCustomer(Student) {
    const studentSchema = {
        
    }

    return Joi.validate(Student, studentSchema);
}
exports.Student = Student ;
exports.validateStudent = validateStudent;