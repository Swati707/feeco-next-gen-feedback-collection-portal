const { Response, validateResponse } = require('../models/response')
const { Respondent, validateRespondent } = require('../models/respondent')

module.exports = {
    addResponse: async (req, res) => {
        let respondentEmail = req.body.email
        let resp = await Respondent.findOne({email: respondentEmail})
        if(resp){
            let response = await Response.findOne({form_id: req.body.form_id, respondent: resp})
            if(response){
                return res.status(302).json({success: false, msg: "Entry already taken!"})
            }
            let newResponse = new Response({
                form_id: req.body.form_id,
                respondent: resp,
                answers: req.body.answers
            })
            response = await newResponse.save()
            resp.responses.push(response)
            let respondent = await resp.save()
        } else {
            let newRespondent = new Respondent({
                email: respondentEmail
            })
            newRespondent = await newRespondent.save()
            let newResponse = new Response({
                form_id: req.body.form_id,
                respondent: newRespondent,
                answers: req.body.answers
            })
            let response = await newResponse.save()
            newRespondent.responses.push(response)
            let respondent = await newRespondent.save()
        }
        res.status(200).json({sucess: true})
    },

    getResponse: async (req, res) => {
        const {id} = req.params
        let response = await Response.findById(id)
        console.log(response)
        //Populate
        res.status(200).json({success: true, response: response})
    },

    getResponseOneForm: async (req, res) => {
        const {form_id} = req.params
        let responses = Response.find({form_id: form_id})
        if(!responses){
            return res.status(404).json({success: false, msg: "No responses found"})
        }
        return res.status(200).json({responses: responses})
    },

    updateResponse: async (req, res) => {

    }
}