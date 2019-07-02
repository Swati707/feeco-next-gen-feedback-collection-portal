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
    name: {                             // Form Title
        required: true,
        type: String
    },
    questions: [questionSchema],        // Questions
    form_creator: {                     // Form Creator
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FormCreator'
    },
    creation_time: {                    // Form creation time
        type: Date,
        default: Date.now
    },
    active_status: {                    // Active status
        type: Boolean,
        default: false
    },
    anonymous: Boolean                  // Anonymous Form collection Flag

}));

function validateForm(form) {
    const formSchema = {}

    return Joi.validate(form, formSchema);
}
exports.Form = Form;
exports.validateForm = validateForm;