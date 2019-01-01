const Joi = require('joi');                 // Used for input validation 
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Teacher, validateTeacher} = require('../models/feedbackModel');


//Temporary model for  route for Teacher 
const Teacher = mongosse.models('Teacher', new mongosse.Schema({
    form_no: {
        required: true,
        type: Number
    },


}));

// Middleware for Json Handling 
router.use(express.json());

// Handling searching of Teacher


//Handling READ (GET) for Teacher
router.get('/', async (req, res) => {
    const teacher = await Teacher.find().sort('name');
    res.send(teacher);
});
//Handling creation (PUT) of students
router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status.send(error.details[0].message);

    const students = await Teacher.findByIdAndUpdate(req.param.id, {
        // Updation of customer 
    }, { new: true });

    if (!students) return res.status(404).send("The students input is invalid.");

    res.send(students);
});


// Handling deletion (DELETE) of students
router.delete('/:id', async (req, res) => {
    const students = await Teacher.fingByIdAndRemove(req.params.id);

    if (!students) return res.status(404).send('The students input is not valid');

    res.send(customer);
});

// Handling updation (POST )of students
router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let students = new Teacher({
        // To be form_model accepts the data and creates new entry

    });

    students = await students.save();

    res.send(students);
});

module.exports = routerTeacher;
