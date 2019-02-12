const express = require('express');
const router = require('express-promise-router')();
const formReceiverController = require('../controllers/form_receiver')

router.route('/add')
    .post(formReceiverController.addFormReceiver)

router.route('/otp')
    .post(formReceiverController.getReceiverFromOTP)

router.route('/form/:form_id')
    .get(formReceiverController.getAllFormReceiver)
    
module.exports = router;