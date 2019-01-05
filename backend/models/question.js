const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: String, 
    question_type: String, 
    possible_answers: [{
        type: String, 
    }],
    question_number: Number
})

exports.module = questionSchema