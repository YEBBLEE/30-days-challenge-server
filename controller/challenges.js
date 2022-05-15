import * as challengeRepo from '../data/challenges.js';

export async function getChallenges(req, res) {
    const nickname = req.query.nickname;
    const result = await challengeRepo.getByNickname(nickname);

    return res.status(200).json(result);
}

export async function createChallenge(req, res) {
    const { title, nickname } = req.body;
    const challengeId = await challengeRepo.create(title, nickname);
    const challenge = await challengeRepo.getById(challengeId);

    return res.status(201).json(challenge);
}

export async function modifyTitle(req, res) {
    const id = req.params.id;
    const { title, nickname } = req.body;

    const challenge = await challengeRepo.updateTitle(id,title,nickname);
    console.log('[Response] title Update');
    console.log(JSON.stringify(challenge));

    if(challenge) {
        return res.status(200).json(challenge);
    }else {
        return res.status(404).json({
            message : "can't modify Challenge Title!"
        });
    }
}

export async function modifyDayChecked(req, res) {
    const daysId = req.params.id;
    const {number,isChecked,chId} = req.body;

    await challengeRepo.updateDays(daysId,number,isChecked,chId);
    const challenge = await challengeRepo.getById(chId);
    
    console.log(`[Response] day Update`);
    console.log(JSON.stringify(challenge));
    if(challenge) {
        return res.status(200).json(challenge);
    }else {
        return res.status(404).json({
            message : "Can't Modify Challenge Day Checked!"
        });
    }
}

export async function deleteChallenge(req, res) {
    const id = req.params.id;
    const {daysId} = req.body;
    await challengeRepo.remove(id,daysId);
    return res.sendStatus(204);
}