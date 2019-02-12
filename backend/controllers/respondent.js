const { Respondent, validateRespondent } = require('../models/respondent')
const { Response, validateResponse } = require('../models/response')

module.exports = {
    addRespondent: async (req, res) => {
        let newRespondent = new Respondent({
            email: req.body.email,
            responses: req.body.responses
        })
        let respondent = await newRespondent.save()
    }
}