const mongoose = require('mongoose');
const Joi = require('joi');

const FormCreator = mongoose.model('FormCreator', new mongoose.Schema({
    username : {
        type : String,
        required : true,
        maxlength : 50
    },
    password:{
        type: String,
        required: true
    },
    name : {
        type : String,
        required : true,
        maxlength : 50
    },
    email : {
        type: String,
        required: true
    },
    forms : [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Form',
    }],
    phone: {
        type: String,
        maxlength: 10
    },
    dob: {
        type: Date,
        required: false
    }
},
{
    usePushEach: true
}
));

function validateFormCreator(FormCreator) {
    const FormCreatorSchema = {}

    return Joi.validate(FormCreator, FormCreatorSchema);
}

exports.FormCreator = FormCreator;
exports.validateFormCreator = validateFormCreator;