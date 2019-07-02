const mongoose = require('mongoose');
const Joi = require('joi');

const FormCreator = mongoose.model('FormCreator', new mongoose.Schema({
    username : {                // Username
        type : String,
        required : true,
        maxlength : 50
    },
    password:{                  // Password
        type: String,
        required: true
    },
    name : {                    // Name of form-creator
        type : String,
        required : true,
        maxlength : 50
    },
    email : {                   // Email of form-creator
        type: String,
        required: true
    },
    forms : [{                  // Forms created by the user
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Form',
    }],
    phone: {                    // Phone number
        type: String,
        maxlength: 10
    },
    dob: {                      // Date of birth
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