const router = require("express").Router()
const password = require('../app/controller/password.contoller')



router.post('/forgotPassword', password.forgotPassword);
router.post('/verifyResetCode', password.verifyResetCode);
router.patch('/resetPassword', password.resetPassword);
 

module.exports = router