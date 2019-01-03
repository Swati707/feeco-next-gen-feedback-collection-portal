const Joi = require('joi');
const mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
    question: String, 
    question_type: String, 
    possible_answers: [{
        type: String, 
    }],
    question_number: Number
})

const Form = mongoose.model('Form', new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    questions: [questionSchema],
    form_creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FormCreator'
        // required: true,
        // type: String
    },
    creation_time: {
        type: Date,
        default: Date.now
    },
    active_status: {
        type: Boolean,
        default: false
    },
    html_body: {
        type: String,
        required: true
    }

}));

function validateForm(form) {
    const formSchema = {}

    return Joi.validate(form, formSchema);
}
exports.Form = Form;
// exports.validateForm = validateForm;