const responseController = require('../controllers/response');
const router = require('express-promise-router')();


router.route('/add')
    .post(responseController.addResponse)

router.route('/:id')
    .get(responseController.getResponse)
    .patch(responseController.updateResponse)

router.route('/form/:form_id')
    .get(responseController.getResponsesOfOneForm)
module.exports = router;
