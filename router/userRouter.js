const express = require ("express")
const {registerUSer,  getUser, loginUser, sendUserPasswordResetEmail, userPassword} = require ("../controllers/userController")
const router = express.Router()
const {protect} = require ("../middleware/authMiddleware")

router.route('/register').post(registerUSer)

router.route('/getme').get(protect, getUser)

router.route('/login').post(loginUser)

router.route('/passwordResetMail').post(sendUserPasswordResetEmail)

router.route('/resetPassword/:id/:token').post(userPassword)



module.exports = router