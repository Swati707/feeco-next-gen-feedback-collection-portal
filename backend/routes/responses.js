const responseController = require('../controllers/response');
const router = require('express-promise-router')();


router.route('/add')                                // to add a new response
    .post(responseController.addResponse)

router.route('/:id')
    .get(responseController.getResponse)            // to get a particular responses
    .patch(responseController.updateResponse)       // to update a particular response

router.route('/form/:form_id')
    .get(responseController.getResponsesOfOneForm)  // to get all responses of a particular form
module.exports = router;
