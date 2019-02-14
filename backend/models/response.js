const Joi = require('joi');
const mongoose = require('mongoose')
const questionSchema = require('./question')

const Response = mongoose.model('Response', new mongoose.Schema({
    form_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form',
        required: true
    },
    respondent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FormReceiver',
        required: true
    },
    submit_time: {
        type: Date,
        default: Date.now
    },
    answers: [{
        question_id: {
            type: questionSchema
        },
        answer: {
            type: String,
            required: false
        }
    }]
}));

function validateResponse(Response) {
    const responseSchema = {}

    return Joi.validate(Response, responseSchema);
}

exports.Response = Response ;
exports.validateResponse = validateResponse;