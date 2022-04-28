import { initDays } from '../class/day.js';
import * as date from '../common/date.js';

//임시 데이터
export let challenges = [
    {
        id: '1',
        title: '😎 1일 1 개발 블로그 포스팅',
        days: { id: '1', days: initDays() },
        startDate: date.setStartDate(),
        endDate: date.setEndDate(),
        createdAt: new Date().toString(),
        isProgress: true,
        nickname: 'YEBIN'
    },
    {
        id: '2',
        title: '🧎‍♀️🌟매일 아침 10분 스트레칭',
        days: { id: '2', days: initDays() },
        startDate: date.setStartDate(),
        endDate: date.setEndDate(),
        createdAt: new Date().toString(),
        isProgress: true,
        nickname: 'YEBIN'
    }
];

export function getByNickname(nickname) {
    const challengesByNickname = challenges.filter((challenge) => {
        challenge.nickname === nickname
    });
    return challengesByNickname ? challengesByNickname : [];
}

export function create(title, nickname) {
    const challenge = {
        id: Date.now().toString(),
        title,
        days: { id: Date.now().toString(), days: initDays()},
        startDate: date.setStartDate(),
        endDate: date.setEndDate(),
        createdAt: new Date(),
        isProgress: true,
        nickname
    };
    challenges = [challenge, ...challenges];
    return challenge;
}

export function updateTitle(id, title, nickname) {
    const challenge = challenges.find((challenge) => {
        return challenge.id === id && challenge.nickname === nickname
    });

    if(challenge) {
        challenge.title = title;
    }
    return challenge;
}

export function updateDays(id,number,isChecked) {
    const challenge = challenges.find((challenge) => {
        return challenge.days.id === id;
    });

    if(challenge) {
        const day = challenge.days.days.find(day => day.number === number);
        day.isChecked = isChecked;
    }

    return challenge;
}

export function remove(id) {
    challenges = challenges.filter((challenge) => challenge.id !== id);
}