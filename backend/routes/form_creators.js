const router = require('express-promise-router')();
const FormCreatorController = require('../controllers/form_creator')

router.route('/signin')
    .post(FormCreatorController.signin)             // To sign-in a user

router.route('/signup')
    .post(FormCreatorController.signup)             // To sign-up a user
    
router.route('/all')
    .get(FormCreatorController.getAllCreators);     // To get all creators

router.route('/:id')
    .get(FormCreatorController.getCreator)          // To get a particular creator
    .patch(FormCreatorController.updateCreator)     // To update a particular creator
    .delete(FormCreatorController.deleteCreator)    // To delete a particular creator
    
module.exports = router;
