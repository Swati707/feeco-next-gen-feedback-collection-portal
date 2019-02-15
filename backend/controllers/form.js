const { Form, validateForm} = require('../models/form')
const { FormCreator } = require('../models/form_creator')

module.exports = {
    addForm: async (req, res, next) => {
        // const { error } = validateForm(req.body);
        // if (error) 
        //     return res.status(400).send(error.details[0].message);

        let newForm = new Form({
            name: req.body.name,
            form_creator: req.body.form_creator,
            questions: req.body.questions,
            html_body: "Add some questions!",
            anonymous: req.body.anonymous
        });

        let form = await newForm.save();
        FormCreator.findOne({_id: form.form_creator}, (err, formCreator) => {
            if(!formCreator)
                return res.status(404).send('The form creator input is not valid')
            formCreator.forms.push(form)
            console.log("form creator is", formCreator)
            formCreator.save()
        })
        Form.findById(form._id, (err, form) => {
            form = form.populate({path: "form_creator", model: "FormCreator"}, (err) => {
                if(err){
                    console.log("Error while populating form creator");
                    return res.json({error: err});
                } else {
                    console.log("form is", form)
                    res.status(201).json({msg: "Form created successfully", form_details: form});
                }
            });
        })        
    },

    getAllForms: async (req, res) => {
        let forms = await Form.find({})
        if(!forms){
            return res.status(404).send("Not found")
        }
        res.status(200).json({success: true, forms: forms})
    },

    getForm: async (req, res, next) => {
        const {id} = req.params
        // Form.find({}, (err, forms) => {
        //     console.log(forms)
        //     return res.status(404).json({forms: forms})
        // })
        Form.findById(id, (err, form) => {
            if (!form) {
                console.log("error", "The form input is not valid")
                return res.status(404).send('The form input is not valid')
            }
            form = form.populate({path: "form_creator", model: "FormCreator"}, (err, form) => {
                if(err){
                    console.log("Error while populating form creator");
                    return res.json({error: err});
                } else {
                    console.log("form is", form)
                    res.status(201).json({success: true, form: form})
                }
            });
        })
    },


    updateForm: async (req, res, next) => {
        const {id} = req.params
        // const { error } = validateForm(req.body);
        // if (error) 
        //     return res.status(400).send(error.details[0].message);
        const updates = req.body
        await Form.findByIdAndUpdate(id, updates)
        await Form.findById(id, (err, form) => {
            if (!form) 
                return res.status(404).send('The form input is not valid')
            form = form.populate({path: "form_creator", model: "FormCreator"}, (err) => {
                if(err){
                    console.log("Error while populating form creator");
                    return res.json({error: err});
                } else {
                    console.log("form is", form)
                    res.status(201).json({success: true, form: form})
                }
            })
        })
    },

    deleteForm: async (req, res, next) => {
        const {id} = req.params
        let form = await Form.findById(id)
        if(!form){
            return res.status(404).send("The form input is not valid")
        }
        let formCreator = await FormCreator.findById(form.form_creator)
        if(formCreator){
            formCreator.forms.pull(form)
            await formCreator.save()
        }
        await Form.findByIdAndRemove(id)
        return res.status(201).json({success: true})
    },
}