const { Response, validateResponse } = require('../models/response')
const { Respondent, validateRespondent } = require('../models/respondent')
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
        let resp = await Respondent.findOne({email: respondentEmail})
        if(resp){
            let response = await Response.findOne({form_id: req.body.form_id, respondent: resp})
            if(response){
                return res.status(302).json({success: false, error: "Entry already taken!"})
            }
            let newResponse = new Response({
                form_id: req.body.form_id,
                respondent: resp,
                answers: req.body.answers
            })
            response = await newResponse.save()
            await resp.responses.push(response.toObject())
            await resp.save()
            createdResponse = response
        } else {
            let newRespondent = new Respondent({
                email: respondentEmail,
                responses: []
            })
            let newResponse = new Response({
                form_id: req.body.form_id,
                respondent: newRespondent,
                answers: req.body.answers
            })
            let response = await newResponse.save()

            await newRespondent.responses.push(response.toObject())
            await newRespondent.save()
            console.log("respondent", newRespondent)
            createdResponse = response
        }
        createdResponse =  createdResponse.populate('form_id question_id', (err, createdResponse) => {
            if(err){
                console.log("Error while populating form_id");
                return res.json({error: err});
            }
            console.log("response", createdResponse)
            res.status(200).json({sucess: true, response: createdResponse})
        })
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
        let responses = await Response.find({form_id: form_id})
        if(responses.length == 0){
            console.log("No responses found!")
            return res.status(404).json({success: false, error: "No responses found"})
        }
        console.log("responses", responses)
        return res.status(200).json({success: true, responses: responses})
    },

    updateResponse: async (req, res) => {

    }
}