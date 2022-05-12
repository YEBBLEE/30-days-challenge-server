import express from 'express';
import * as challengeController from '../controller/challenges.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';

const router = express.Router();

const validateChallenge = [
  body('title')
  .trim()
  .isLength({min:1})
  .withMessage("Challenge's title should be at least 1 character❣"),
  validate,
];

//GET /challenges?nickname=:nickname
router.get('/',challengeController.getChallenges);

//POST /challenges
router.post('/', validateChallenge, challengeController.createChallenge);

//PUT /challenges/:id
router.put('/:id', validateChallenge, challengeController.modifyTitle);

//PUT /challenges/days/:id
router.put('/days/:id',challengeController.modifyDayChecked);

//DELETE /challenges/:id
router.delete('/:id',challengeController.deleteChallenge);

export default router;
