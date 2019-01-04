const express = require('express');
const router = require('express-promise-router')();
const formController = require('../controllers/form')

router.route('/all')
    .get(formController.getAllForms);

router.route('/add')
    .post(formController.addForm)

router.route('/:id')
    .get(formController.getForm)
    .patch(formController.updateForm)
    .delete(formController.deleteForm)

module.exports = router;    