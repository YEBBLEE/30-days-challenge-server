import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_SEC;


//임의의 사용자 데이터
let users = [
    {
        id:'1',
        nickname:'yebin',
        password:'123',
        email:'yebb@gmail.com',
        url:'https://avatars.githubusercontent.com/u/68329482?s=40&v=4'
    },
    {
        id:'2',
        nickname:'choi',
        password:'123',
        email:'choi@gmail.com',
        url:''
    }
]; 


router.post('/signup',(req,res,next) => {
    const {nickname, password, email, url} = req.body;

    const signedUser = users.find((user) => user.nickname === nickname);

    if(signedUser) {
        return res.status(409).json({message : `${nickname} is already exist`});
    } else {
        //비번 암호화
        const hashed = bcrypt.hashSync(password,10);
        const user = {
            id: Date.now().toString(),
            nickname,
            password: hashed,
            email,
            url
        };
        users.push(user);

        //토큰생성
        const token = jwt.sign(
            {nickname: nickname},
            secret,
            {expiresIn: expiresIn}
        );
        console.log(users);
        return res.status(200).json({token,nickname});
    }
});


router.post('/login',(req,res,next) => {
    const {token, nickname, password } = req.body;

});


export default router;