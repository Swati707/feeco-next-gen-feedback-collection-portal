const Joi = require('joi');                 // Used for input validation 
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Students, validateStudent} = require('../models/studentModel');


//Temporary model for  route for students 
const Students = mongosse.models('Students', new mongosse.Schema({
    form_no: {
        required: true,
        type: Number
    },


}));

// Middleware for Json Handling 
router.use(express.json());

// Handling searching of students


//Handling READ (GET) for students
router.get('/', async (req, res) => {
    const students = await Students.find().sort('name');
    res.send(students);
});
//Handling creation (PUT) of students
router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status.send(error.details[0].message);

    const students = await Students.findByIdAndUpdate(req.param.id, {
        // Updation of customer 
    }, { new: true });

    if (!students) return res.status(404).send("The students input is invalid.");

    res.send(students);
});


// Handling deletion (DELETE) of students
router.delete('/:id', async (req, res) => {
    const students = await Students.fingByIdAndRemove(req.params.id);

    if (!students) return res.status(404).send('The students input is not valid');

    res.send(customer);
});

// Handling updation (POST )of students
router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let students = new Students({
        // To be form_model accepts the data and creates new entry

    });

    students = await students.save();

    res.send(students);
});

module.exports = routerStudent;
