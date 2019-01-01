const Joi = require('joi');                 // Used for input validation 
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Feedback, validateFeedback} = require('../models/feedbackModel');


//Temporary model in route for feedbacks 
const Feedback = mongosse.models('Feedback', new mongosse.Schema({
    feedback_no: {
        required: true,
        type: Number
    },


}));


// Middleware for Json Handling 
router.use(express.json());




// Handling searching of feedbacks 

//Handling READ (GET) for feedbacks 
router.get('/', async (req, res) => {
    const feedbacks = await Feedback.find().sort('name');
    res.send(feedbacks);
});


//Handling creation (POST) of feedbacks 
router.post('/', async (req, res) => {
    const { error } = validateFeedback(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let feedback = new Feedback({
        // To be feedback_model accepts the data and creates new entry

    });

    feedback = await feedback.save();

    res.send(feedback);
});

// Handling deletion (DELETE) of feedbacks 

router.delete('/:id', async (req, res) => {
    const feedback = await Feedback.fingByIdAndRemove(req.params.id);

    if (!feedback) return res.status(404).send('The feedback input is not valid');

    res.send(customer);
});

// Handling updation (PUT )of feedbacks 
router.put('/:id', async (req, res) => {
    const { error } = validateFeedback(req.body);
    if (error) return res.status.send(error.details[0].message);

    const feedback = await Feedback.findByIdAndUpdate(req.param.id, {
        // Updation of feedbacks 
    }, { new: true });

    if (!feedback) return res.status(404).send("The feedback input is invalid.");

    res.send(feedback);
});

module.exports = routerFeedback;