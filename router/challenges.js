import express from 'express';
import * as challengeController from '../controller/challenges.js';

const router = express.Router();

//GET /challenges?nickname=:nickname
router.get('/',(req,res) => {
    const nickname = req.query.nickname;
    const result = challengeController.getByNickname(nickname);

    res.status(200).json(result);
});

//POST /challenges
router.post('/',(req,res) => {
    const { title, nickname } = req.body;
    const challenge = challengeController.create(title, nickname);

    res.status(201).json(challenge);
});

//PUT /challenges/:id
router.put('/:id',(req,res) => {
    const id = req.params.id;
    const { title, nickname } = req.body;

    const challenge = challengeController.updateTitle(id,title,nickname);

    if(challenge) {
        res.status(200).json(challenge);
    }else {
        res.status(404).json({
            message : "can't modify Challenge Title!"
        });
    }
});

//PUT /challenges/days/:id
router.put('/days/:id',(req,res) => {
    const id = req.params.id;
    const {number,isChecked} = req.body;

    const challenge = challengeController.updateDays(id,number,isChecked);
    
    if(challenge) {
        res.status(200).json(challenge);
    }else {
        res.status(404).json({
            message : "Can't Modify Challenge Day Checked!"
        });
    }
});

//DELETE /challenges/:id
router.delete('/:id',(req,res) => {
    const id = req.params.id;
    challengeController.remove(id);
    res.sendStatus(204);
})

export default router;
