import * as challengeRepo from '../data/challenges.js';

export function getChallenges(req, res) {
    const nickname = req.query.nickname;
    const result = challengeRepo.getByNickname(nickname);

    res.status(200).json(result);
}

export function createChallenge(req, res) {
    const { title, nickname } = req.body;
    const challenge = challengeRepo.create(title, nickname);

    res.status(201).json(challenge);
}

export function modifyTitle(req, res) {
    const id = req.params.id;
    const { title, nickname } = req.body;

    const challenge = challengeRepo.updateTitle(id,title,nickname);

    if(challenge) {
        res.status(200).json(challenge);
    }else {
        res.status(404).json({
            message : "can't modify Challenge Title!"
        });
    }
}

export function modifyDayChecked(req, res) {
    const id = req.params.id;
    const {number,isChecked} = req.body;

    const challenge = challengeRepo.updateDays(id,number,isChecked);
    
    if(challenge) {
        res.status(200).json(challenge);
    }else {
        res.status(404).json({
            message : "Can't Modify Challenge Day Checked!"
        });
    }
}

export function deleteChallenge(req, res) {
    const id = req.params.id;
    challengeRepo.remove(id);
    res.sendStatus(204);
}