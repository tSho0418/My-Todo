import express, { Router } from 'express';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/database';
import setupPassport, * as controller from './controller';
import session from 'express-session';
import passporrt from 'passport';
import { set } from 'mongoose';
import User from './models/user';

const COKKIE_MAX_AGE: number = 1000 * 60 * 60 * 24 * 3;
const COOKIE_BASE_OPTIONS = {
    httpOnly: true,
    maxAge: COKKIE_MAX_AGE,
    secure: false,
};
const SESSION_SECRET = "foobarbaz";

const app = express();
const PORT: number = 8080;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: COOKIE_BASE_OPTIONS,
}));

app.use(passporrt.initialize());
app.use(passporrt.session());

app.get('/', controller.getHome);

app.get('/sign-in', controller.getSignIn);
app.post('/sign-in', controller.postSignIn);

app.get('/sign-up', controller.getSignUp);
app.post('/sign-up', controller.postSignUp);

app.get('/todolist', controller.getTasks);

app.post('/todolist', controller.postTask);

app.get('/todolist/task/:id', controller.getTask);
app.put('/todolist/task/:id', controller.putTask);

app.delete('/todolist/task/:id', controller.deleteTask);

app.listen(PORT, async() => {
    await sequelize.sync();
    setupPassport(User);
    console.log(`Server is running on http://localhost:${PORT}`);
});