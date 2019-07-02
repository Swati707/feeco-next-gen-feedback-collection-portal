const Joi = require('joi');
const mongoose = require('mongoose')
const questionSchema = require('./question')

const Response = mongoose.model('Response', new mongoose.Schema({
    form_id: {              // form ID to which the response belongs
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form',
        required: true
    },
    respondent: {           // the respondent ID
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FormReceiver',
        required: true
    },
    submit_time: {          // submit time of the response
        type: Date,
        default: Date.now
    },
    answers: [{             // array of answers to questions of the form
        question_id: {      // question ID
            type: questionSchema
        },
        answer: {           // answer
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