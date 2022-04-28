import express from 'express';
import * as challengeController from '../controller/challenges.js';

const router = express.Router();

//GET /challenges?nickname=:nickname
router.get('/',challengeController.getChallenges);

//POST /challenges
router.post('/', challengeController.createChallenge);

//PUT /challenges/:id
router.put('/:id',challengeController.modifyTitle);

//PUT /challenges/days/:id
router.put('/days/:id',challengeController.modifyDayChecked);

//DELETE /challenges/:id
router.delete('/:id',challengeController.deleteChallenge);

export default router;
