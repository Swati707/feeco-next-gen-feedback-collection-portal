const express = require('express');
const router = require('express-promise-router')();
const formController = require('../controllers/form')

router.route('/all')
    .get(formController.getAllForms);       // To get all forms

router.route('/add')
    .post(formController.addForm)           // To add a new form

router.route('/:id')
    .get(formController.getForm)            // To get a particular form
    .patch(formController.updateForm)       // To update a particular form
    .delete(formController.deleteForm)      // To delete a particular form

module.exports = router;    