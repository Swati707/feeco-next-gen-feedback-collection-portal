const Joi = require('joi');
const mongoose = require('mongoose');

const FormReceiver = mongoose.model('FormReceiver', new mongoose.Schema({
    email : {                           // Email of the form-link-receivers
        type: String,
        required: false
    },
    otp : {                             // OTPs generated for each form-link-receiver
        type: String,
    },
    submitted: {                        // Submitted flag to check if the form is filled only once
        type: Boolean,
        default: false
    },
    form: {                             // The 'form' the receiver is asked to fill
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form'
    },
    responses : {                       // The responses submitted by the form-receiver
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Response'
    }

}), 'FormReceiver');

function validateFormReceiver(FormReceiver) {
    const formReceiverSchema = {}

    return Joi.validate(FormReceiver, formReceiverSchema);
}
exports.FormReceiver = FormReceiver ;
exports.validateFormReceiver = validateFormReceiver;