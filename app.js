import express from 'express';
import cors from 'cors';
import challengesRouter from './router/challenges.js';


const app = express();

app.use(express.json());
app.use(cors());

console.log('app!');

app.use('/challenges',challengesRouter);

app.use((req,res,next) => {
    res.sendStatus(404);
});

app.use((error,req,res,next) => {
    console.error(error);
    res.sendStatus(500);
});

app.listen(8080);