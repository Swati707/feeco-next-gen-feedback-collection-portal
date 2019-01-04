const Joi = require('joi');
const mongoose = require('mongoose');
const {Form} = require('./form')
const {Respondent} = require('./respondent')

const Response = mongoose.model('Response', new mongoose.Schema({
    form_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form',
        required: true
    },
    respondent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Respondent',
        required: true
    },
    submit_time: {
        type: Date,
        default: Date.now
    },
    answers: [{
        question_number: {
            type: Number,
            required: true
        },
        answer: {
            type: String,
            required: true
        }
    }]
}));

function validateResponse(Response) {
    const responseSchema = {}

    return Joi.validate(Response, responseSchema);
}

exports.Response = Response ;
exports.validateResponse = validateResponse;