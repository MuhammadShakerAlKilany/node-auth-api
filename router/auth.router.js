const router = require('express').Router()
const {login, register  } = require('../controllers/auth.controller')
const { body, validationResult } = require('express-validator');
router.post('/login',
    body('email').isEmail(),
    body('password').isLength({ min: 5,max:255 }),
    validate,login);
router.post('/register',
    body('email').isEmail(),
    body('password').isLength({ min: 5 ,max:255 }),
    body('name').isLength({ min: 5,max:255 }),

    validate, register);


module.exports = router

function validate(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.isEmpty(),errors.array(),req.body)
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }