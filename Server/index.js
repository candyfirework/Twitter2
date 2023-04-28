import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import tweetsRouter from './router/tweets.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));


app.use('/tweets',tweetsRouter); 

app.use((req, res) => {
    res.sendStatus(404)
})

app.use((error,req, res, next) => {
    console.log(error);
    res.sendStatus(500);
})


app.listen(8080);







