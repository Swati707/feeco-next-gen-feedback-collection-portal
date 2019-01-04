const router = require('express-promise-router')();
const FormCreatorController = require('../controllers/form_creator')

router.route('/signin')
    .post(FormCreatorController.signin)

router.route('/signup')
    .post(FormCreatorController.signup)
    
router.route('/all')
    .get(FormCreatorController.getAllCreators);

router.route('/:id')
    .get(FormCreatorController.getCreator)
    .patch(FormCreatorController.updateCreator)
    .delete(FormCreatorController.deleteCreator)
    
module.exports = router;
