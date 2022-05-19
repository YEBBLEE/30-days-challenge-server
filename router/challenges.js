import express from 'express';
import * as challengeController from '../controller/challenges.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

const validateChallenge = [
  body('title')
  .trim()
  .isLength({min:1})
  .withMessage("Challenge's title should be at least 1 character❣"),
  validate,
];

//GET /challenges?nickname=:nickname
router.get('/', isAuth, challengeController.getChallenges);

//POST /challenges
router.post('/', isAuth, validateChallenge, challengeController.createChallenge);

//PUT /challenges/:id
router.put('/:id', isAuth, validateChallenge, challengeController.modifyTitle);

//PUT /challenges/days/:id
router.put('/days/:id', isAuth, challengeController.modifyDayChecked);

//DELETE /challenges/:id
router.delete('/:id', isAuth, challengeController.deleteChallenge);

export default router;
