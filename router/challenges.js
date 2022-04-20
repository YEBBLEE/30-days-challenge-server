import express from 'express';
import * as date from '../common/date.js';
import { initDays } from '../class/day.js';

const router = express.Router();

//임시 데이터
let challenges = [
    {
        id: '1',
        title: '😎 1일 1 개발 블로그 포스팅',
        days: { id: '1', days: initDays() },
        startDate: date.setStartDate(),
        endDate: date.setEndDate(),
        createdAt: new Date().toString(),
        nickname: 'YEBIN'
    },
    {
        id: '2',
        title: '🧎‍♀️🌟매일 아침 10분 스트레칭',
        days: { id: '2', days: initDays() },
        startDate: date.setStartDate(),
        endDate: date.setEndDate(),
        createdAt: new Date().toString(),
        nickname: 'YEBIN'
    }
];

//GET /challenges?nickname=:nickname
router.get('/',(req,res) => {
    const nickname = req.query.nickname;
    const result = nickname ? 
        challenges.filter((challenge) => challenge.nickname === nickname) 
        : [];
    res.status(200).json(result);
});


//POST /challenges
router.post('/',(req,res) => {
    const { title, nickname } = req.body;

    const challenge = {
        id: Date.now().toString(),
        title,
        days: { id: Date.now().toString(), days: initDays()},
        startDate: date.setStartDate(),
        endDate: date.setEndDate(),
        createdAt: new Date(),
        nickname
    };

    challenges = [challenge, ...challenges];
    res.status(201).json(challenge);
});

//PUT /challenges/:id
router.put('/:id',(req,res) => {
    const id = req.params.id;
    const { title, nickname } = req.body;

    const challenge = challenges.find((challenge) => { 
        return challenge.id === id && challenge.nickname === nickname
    });

    if(challenge) {
        challenge.title = title;
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

    const challenge = challenges.find((challenge) => {
        return challenge.days.id === id
    });
    
    if(challenge) {
        const day = challenge.days.days.find(day => day.number === number);
        day.isChecked = isChecked;
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
    challenges = challenges.filter((challenge) => challenge.id !== id);
    res.sendStatus(204);
})

export default router;
