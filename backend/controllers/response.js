const { Response, validateResponse } = require('../models/response')
const { Respondent, validateRespondent } = require('../models/respondent')
const { FormReceiver, validateFormReceiver } = require('../models/form_receiver')
const { Form } = require('../models/form')

module.exports = {
    addResponse: async (req, res) => {
        let form = await Form.findById(req.body.form_id)
        if(!form){
            console.log("Form not found!")
            return res.status(404).json({success: false, error: "Form not found!"})
        }
        let respondentEmail = req.body.email
        var createdResponse
        let resp = await FormReceiver.findOne({email: respondentEmail, form: req.body.form_id})
        if(resp){
            if(resp.submitted){
                return res.status(302).json({success: false, error: "Entry already taken!"})
            }
            
            let newResponse = new Response({
                form_id: req.body.form_id,
                respondent: resp,
                answers: req.body.answers
            })
            response = await newResponse.save()
            resp.submitted = true
            resp.responses = await Response.findById(response._id)
            await resp.save()
            createdResponse = response
            createdResponse =  createdResponse.populate('form_id question_id', (err, createdResponse) => {
                if(err){
                    console.log("Error while populating form_id");
                    return res.json({error: err});
                }
                console.log("response", createdResponse)
                res.status(200).json({sucess: true, response: createdResponse})
            })
        } else {
            console.log("Respondent not found!")
            return res.status(404).json({success: false, error: "Respondent not found!"})
        }
    },

    getResponse: async (req, res) => {
        const {id} = req.params
        let response = await Response.findById(id)
        response = response.populate('respondent form_id', (err) => {
            if(err){
                console.log("Error while populating respondent and forms");
                return res.status(404).json({success: false, error: err});
            } else {
                console.log("response", response)
                res.status(200).json({success: true, response: response})
            }
        })
    },

    getResponsesOfOneForm: async (req, res) => {
        const {form_id} = req.params
        let form = Form.findById(form_id)
        var resp
        if(!form){
            console.log("Form not found")
        }
        if(form.anonymous){
            resp = await Response.find({form_id: form_id})
        } else {
            resp = await Response.find({form_id: form_id}).populate('respondent', (err, responses) => {
                if(err){
                    console.log("Error while populating respondent and forms");
                    return res.status(404).json({success: false, error: err});
                } 
            })
        }

        if(resp.length == 0){
            console.log("No responses found!")
            return res.status(404).json({success: false, error: "No responses found"})
        }
        return res.status(200).json({success: true, responses: resp})
    },

    updateResponse: async (req, res) => {    
    }
}