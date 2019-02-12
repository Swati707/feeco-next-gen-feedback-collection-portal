const router = require('express-promise-router')();
const respondentController = require('../controllers/respondent')

// router.route('/all')
//     .get(respondentController.getAllRespondents)

// router.route('/all/:formId')
//     .get(respondentController.getAllRespondentsOneForm)

router.route('/add')
    .post(respondentController.addRespondent)

// router.route('/:id')
//     .get(respondentController.getRespondent)
//     .patch(respondentController.updateRespondent)
//     .delete(respondentController.deleteRespondent)
    
module.exports = router;