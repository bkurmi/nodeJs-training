const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const authController = require('../controllers/auth-controller');

const router = express.Router();

//router.post(endpoint, request ValidationRules, controller)
router.post('/signup',
    [
        body('email')
            .isEmail()
            .withMessage("please enter valid email address.")
            .custom((value, { req }) => {
                return User.findOne({ email: value }).then(userDoc => {
                if (userDoc) {
                    return Promise.reject('E-Mail address already exists!');
                }
                });
            })
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({ min: 5 }),
        body('name')
            .trim()
            .not()
            .isEmpty()
    ],
    authController.signUp
)

module.exports = router;