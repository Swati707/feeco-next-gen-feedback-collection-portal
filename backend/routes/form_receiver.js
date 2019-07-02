const express = require('express');
const router = require('express-promise-router')();
const formReceiverController = require('../controllers/form_receiver')

router.route('/add')
    .post(formReceiverController.addFormReceiver)       // To add a form-receiver

router.route('/otp')
    .post(formReceiverController.getReceiverFromOTP)    // To get a receiver from OTP

router.route('/form/:form_id')
    .get(formReceiverController.getAllFormReceiver)     // To get all receivers of a particular form
    
module.exports = router;