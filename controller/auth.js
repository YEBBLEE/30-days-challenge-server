import * as userRepo from '../data/auth.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

const secret = config.jwt.secretKey;
const expiresIn = config.jwt.expireInSec;
const bcryptSaltRounds = config.bcrypt.saltRounds;

export async function signup(req, res) {
    const { nickname, password, email, url } = req.body;
    const signedUser = await userRepo.findByNickname(nickname);
    if(signedUser) {
        return res.status(409).json({message : `${nickname} is already exist`});
    }

    //비번 암호화
    const hashed = await bcrypt.hash(password,bcryptSaltRounds);
    const id = await userRepo.createUser({
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

export async function login(req, res) {
    const { nickname, password } = req.body;
    const user = await userRepo.findByNickname(nickname);
    if(!user) {
        return res.status(403).json({message: `${nickname} is not exist!`});
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
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

export async function me(req,res,next) {
    const user = await userRepo.findById(req.userId);
    if(!user) {
        return res.status(404).json({message: 'User not found'});
    }
    return res.status(200).json({token:req.token,nickname:user.nickname});
}