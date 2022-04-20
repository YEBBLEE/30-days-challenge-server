import express from 'express';
import * as date from '../common/date.js';
import { initDays } from '../class/day.js';

const router = express.Router();

//임시 데이터
let challenges = [
    {
        id:1,
        title: '😎 1일 1 개발 블로그 포스팅',
        days: initDays(),
        startDate: date.setStartDate(),
        endDate: date.setEndDate(),
        createdAt: new Date().toString(),
        nickname: 'YEBIN'
    },
    {
        id:2,
        title: '🧎‍♀️🌟매일 아침 10분 스트레칭',
        days: initDays(),
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
        days: initDays(),
        startDate: date.setStartDate(),
        endDate: date.setEndDate(),
        createdAt: new Date(),
        nickname
    };

    challenges = [challenge, ...challenges];
    res.status(201).json(challenge);
});

export default router;
