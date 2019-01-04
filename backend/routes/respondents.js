const express = require('express');
const router = require('express-promise-router')();

router.use(express.json());

router.route('/all')
    .get();

router.route('/add')
    .post()

router.route('/:id')
    .get()
    .patch()
    .delete()
    
module.exports = router;