import * as userRepo from '../data/auth.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

const secret = config.jwt.secretKey;
const expiresIn = config.jwt.expireInSec;
const bcryptSaltRounds = config.bcrypt.saltRounds;

export function signup(req, res) {
    const { nickname, password, email, url } = req.body;
    const signedUser = userRepo.findByNickname(nickname);
    if(signedUser) {
        return res.status(409).json({message : `${nickname} is already exist`});
    }

    //비번 암호화
    const hashed = bcrypt.hashSync(password,bcryptSaltRounds);
    const id = userRepo.createUser({
        nickname,
        password: hashed,
        email,
        url
    });

    //토큰 생성
    const token = jwt.sign(
        {id: id},
        secret,
        {expiresIn: expiresIn}
    );
    return res.status(200).json({token,nickname});
}

export function login(req, res) {
    const { nickname, password } = req.body;
    const user = userRepo.findByNickname(nickname);
    if(!user) {
        return res.status(403).json({message: `${nickname} is not exist!`});
    }
    const isCorrectPassword = bcrypt.compareSync(password, user.password);
    if(!isCorrectPassword) {
        return res.status(403).json({message : `Wrong Password!`});
    }

    const token =  jwt.sign(
        {id: user.id},
        secret,
        {expiresIn: expiresIn}
    );
    return res.status(200).json({token,nickname});
}