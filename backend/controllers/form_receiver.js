const { Form, validateForm } = require('../models/form')
const { FormReceiver, validateFormReceiver } = require('../models/form_receiver')
var crypto = require('crypto');

module.exports = {
    
    addFormReceiver: async (req, res) => {

        console.log(req.body)
        const form_id = req.body.form
        await Form.findById(form_id, (err, form) => {
            if (!form) {
                console.log("error", "The form input is not valid")
                return res.status(404).send('The form input is not valid')
            }

            var email_ids = req.body.emailids.split(";")
            email_ids.forEach(async email => {
                let resp = await FormReceiver.findOne({form: form_id, email: email})
                if(!resp){
                    let otp = crypto.createHash('md5').update(email).digest("hex");
                    let newFormReceiver = new FormReceiver({
                        email: email,
                        otp: otp,
                        form: form
                    })
                    let formReceiver = await newFormReceiver.save()
                    console.log(formReceiver)
                }
            });
        })
        res.status(200).json({success: true})
    },

    getReceiverFromOTP: async (req, res) => {
        let otp = req.body.otp
        await FormReceiver.findOne({otp: otp}, async (err, form_receiver) => {
            if(!form_receiver){
                console.log("error", "The form receiver is not valid")
                return res.status(404).send('The form receiver input is not valid')
            }
            form_receiver = form_receiver.populate('form', (err, form_receiver) => {
                if(err){
                    console.log("Error while populating form");
                    return res.status(404).json({success: false, error: err});
                } 
                console.log("form receiver", form_receiver)
                res.status(200).json({success: true, form_receiver: form_receiver})
            })
        })
    },

    getAllFormReceiver: async (req, res) => {
        const {form_id} = req.params
        form_receivers = await FormReceiver.find({form: form_id})
        if(!form_receivers){
            console.log("No form receivers found for this form")
            return res.status(404).json({success: false, error: "No form receivers found for this form"})
        }
        res.status(200).json({success: true, form_receivers: form_receivers})
    }
}