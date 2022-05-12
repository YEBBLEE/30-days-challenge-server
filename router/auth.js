import express from 'express';
import * as authController from '../controller/auth.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';

const router = express.Router();

const validateEssential = [
  body('nickname')
    .trim()
    .notEmpty()
    .withMessage('Nickanme is Empty ❣ '),
  body('password')
    .trim()
    .notEmpty({min:5})
    .withMessage('Password should be at least 5 characters❣'),
  validate,
]

const validateSignup = [
  ...validateEssential,
  body('email').isEmail()
    .normalizeEmail().withMessage('Please Enter valid email address ❣'),
  body('url').isURL()
    .withMessage('Please Enter valid URL❣')
    .optional({nullable: true,checkFalsy: true}),
  validate
]
router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateEssential, authController.login);

export default router;