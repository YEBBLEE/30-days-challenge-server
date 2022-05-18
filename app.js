import express from 'express';
import cors from 'cors';
import challengesRouter from './router/challenges.js';
import authRouter from './router/auth.js';
import { config } from './config.js';
import { db } from './db/database.js';
import https from 'https';
import fs from 'fs';

const hostname = 'yebb-whybbb.com';
var privateKey = fs.readFileSync(`/etc/letsencrypt/live/${hostname}/privkey.pem`);
var certificate = fs.readFileSync(`/etc/letsencrypt/live/${hostname}/cert.pem`);
var ca = fs.readFileSync(`/etc/letsencrypt/live/${hostname}/chain.pem`);
const credentials = { key: privateKey, cert: certificate, ca: ca };

const app = express();

app.use(express.json());
app.use(cors());

app.use('/challenges',challengesRouter);
app.use('/auth',authRouter);

app.use((req,res,next) => {
    res.sendStatus(404);
});

app.use((error,req,res,next) => {
    console.error(error);
    res.sendStatus(500);
});

db.getConnection().then((connection)=> console.log(connection));

https.createServer(credentials, app).listen(config.host.port);
