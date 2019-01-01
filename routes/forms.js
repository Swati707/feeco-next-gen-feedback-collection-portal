const Joi = require('joi');                 // Used for input validation 
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Forms, validateForm} = require('../models/formsModel');



//Temporary model for  route for forms 
const Forms = mongosse.models('Forms', new mongosse.Schema({
    form_no: {
        required: true,
        type: Number
    },


}));

// Middleware for Json Handling 
router.use(express.json());

// Handling searching of forms


//Handling READ (GET) for forms
router.get('/', async (req, res) => {
    const forms = await Forms.find().sort('name');
    res.send(forms);
});
//Handling creation (PUT) of forms
router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status.send(error.details[0].message);

    const forms = await Forms.findByIdAndUpdate(req.param.id, {
        // Updation of customer 
    }, { new: true });

    if (!forms) return res.status(404).send("The forms input is invalid.");

    res.send(forms);
});


// Handling deletion (DELETE) of forms
router.delete('/:id', async (req, res) => {
    const forms = await Forms.fingByIdAndRemove(req.params.id);

    if (!forms) return res.status(404).send('The forms input is not valid');

    res.send(customer);
});

// Handling updation (POST )of forms
router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let forms = new Forms({
        // To be form_model accepts the data and creates new entry

    });

    forms = await forms.save();

    res.send(forms);
});

module.exports = routerForm;
