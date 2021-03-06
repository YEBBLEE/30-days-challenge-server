import express from 'express';
import cors from 'cors';
import challengesRouter from './router/challenges.js';
import authRouter from './router/auth.js';
import { config } from './config.js';
import { db } from './db/database.js';

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
app.listen(config.host.port);
