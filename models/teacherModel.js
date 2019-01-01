const Joi = require('joi');
const mongosse = require('mongoose');
const express = require('express');
const router = express.Router();

const Teacher = mongosse.models('Teacher', new mongosse.Schema({
    name : {
        type : String,
        required : true,
        maxlength : 50
    },
    teacherCode : {
        type : Number,
        required : true,
    },
    Date : {
        type : Date,
        default : Date.now 
    },
    department : [String] ,
    courses : [String]
}));

function validateCustomer(teacher) {
    const teacherSchema = {
        
    }

    return Joi.validate(teacher, teacherSchema);
}

exports.Teacher = Teacher ;
exports.validateTeacher = validateTeacher;