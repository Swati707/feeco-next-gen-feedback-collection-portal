const { FormCreator, validateFormCreator } = require('../models/form_creator')
const { Form, validateForm } = require('../models/form')

module.exports = {
    signup: async (req, res) => {
        let params = req.body
        let creator = await FormCreator.findOne({username: req.body.username})
        if(creator){
            console.log("Username already exist")
            return res.status(301).json({success: false, error: "Username already exist!"})
        }
        let newCreator = FormCreator({
            username: params.username,
            password: params.password,
            name: params.name,
            email: params.email,
            forms: [],
            phone: params.phone,
            dob: params.dob
        })
        let creator = await newCreator.save()
        console.log(creator)
        res.status(200).json({success: true, creator: creator})
    },

    signin: async (req, res) => {
        let params = req.body
        let creator = await FormCreator.findOne({username: params.username})
        console.log(creator)
        if(!creator){
            console.log("Username not found!");
            return res.status(404).json({success: false, error: "Username incorrect"});
        }
        if(creator.password != params.password){
            console.log("Password incorrect")
            return res.status(404).json({success: false, error: "Password incorrect"})
        } 
        creator = creator.populate({path: "forms", model: "Form"}, (err) => {
            if(err){
                console.log("Error while populating form forms");
                return res.status(404).json({success: false, error: err});
            } else {
                res.status(201).json({success: true, creator: creator})
            }
        })
    },

    getAllCreators: async (req, res) => {
        // res.send("Cant get all Creators. Sorry.")
        FormCreator.find({}, (err, creators) => {
            console.log(creators)
            res.status(201).json({creators: creators})
        })
    },

    getCreator: async (req, res) => {
        const {id} = req.params
        await FormCreator.findById(id, (err, creator) => {
            if (!creator) 
                return res.status(404).send('The creators input is not valid')
            creator = creator.populate({path: "forms", model: "Form"}, (err) => {
                if(err){
                    console.log("Error while populating form forms");
                    return res.json({error: err});
                } else {
                    res.status(201).json({success: true, creator: creator})
                }
            })
        })        
    },

    updateCreator: async (req, res, next) => {
        const {id} = req.params
        // const { error } = validateCreator(req.body);
        // if (error) 
        //     return res.status(400).send(error.details[0].message);
        const updates = req.body
        await FormCreator.findByIdAndUpdate(id, updates)
        await FormCreator.findById(id, (err, creator) => {
            if (!creator) 
                return res.status(404).send('The creators input is not valid')
            creator = creator.populate({path: "forms", model: "Form"}, (err) => {
                if(err){
                    console.log("Error while populating form forms");
                    return res.json({error: err});
                } else {
                    res.status(201).json({success: true, creator: creator})
                }
            })
        })
    },

    deleteCreator: async (req, res, next) => {
        const {id} = req.params
        let formCreator = await FormCreator.findById(id)
        if(!formCreator){
            return res.status(404).send('The creator input is not valid')
        }
        formCreator.forms.forEach(async formId => {
            await Form.findByIdAndRemove(formId)
        });
        await FormCreator.findByIdAndRemove(id)
        return res.status(201).json({success: true})
    },
}