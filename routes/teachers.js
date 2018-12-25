const Joi = require('joi');                 // Used for input validation 
const express = require('express');
const router = express.Router();

router.use(express.json());

//Model for teacher 
class Teacher {

};
var teacher = new Teacher();


// Handling searching of teachers


//Handling READ (GET) for teachers
router.get('/teacher', (req, res) => {
    res.send(teacher);
})

//Handling creation (PUT) of teachers

// Handling deletion (DELETE) of teachers

// Handling updation (POST )of teachers
