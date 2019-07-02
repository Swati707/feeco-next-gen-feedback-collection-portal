const Joi = require('joi');
const mongoose = require('mongoose');
const {Response} = require('./response');

const Respondent = mongoose.model('Respondent', new mongoose.Schema({
    email : {           // Email of the respondent
        type: String,
        required: false
    },
    responses : [{      // Responses
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Response'
    }]
}));

function validateRespondent(Respondent) {
    const respondentSchema = {}

    return Joi.validate(Respondent, respondentSchema);
}
exports.Respondent = Respondent ;
exports.validateRespondent = validateRespondent;