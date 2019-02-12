const Joi = require('joi');
const mongoose = require('mongoose');
const {Form} = require('./form');

const FormReceiver = mongoose.model('FormReceiver', new mongoose.Schema({
    email : {
        type: String,
        required: false
    },
    otp : {
        type: String,
    },
    submitted: {
        type: Boolean,
        default: false
    },
    form: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form'
    }

}));

function validateFormReceiver(FormReceiver) {
    const formReceiverSchema = {}

    return Joi.validate(FormReceiver, formReceiverSchema);
}
exports.FormReceiver = FormReceiver ;
exports.validateFormReceiver = validateFormReceiver;