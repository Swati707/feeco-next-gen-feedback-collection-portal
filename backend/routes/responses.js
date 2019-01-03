const responseController = require('../controllers/response');
const router = require('express-promise-router')();


router.route('/all')
    .get(responseController.getAllResponses);

router.route('/add')
    .post(responseController.addResponse)

router.route('/:id')
    .get(responseController.getResponse)
    .patch(responseController.updateResponse)
    .delete(responseController.deleteResponse)

module.exports = router;
