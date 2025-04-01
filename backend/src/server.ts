import express, { Router } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/database';
import setupPassport, * as controller from './controller';
import session from 'express-session';
import passport from 'passport';
import User from './models/user';
import cookieParser from 'cookie-parser';
import SequelizeStore from 'connect-session-sequelize';
import 'express-session';

declare module 'express-session' {
    interface SessionData {
        passport?: { user?: any };
    }
}

const COKKIE_MAX_AGE: number = 1000 * 60 * 60 * 24 * 3;
const COOKIE_BASE_OPTIONS = {
    domain: "localhost",
    httpOnly: true,
    maxAge: COKKIE_MAX_AGE,
    secure: false,
    sameSite: "lax" as const,
};
const SESSION_SECRET = "foobarbaz";
const SequelizeSessionStore = SequelizeStore(session.Store);

const sessionStore = new SequelizeSessionStore({
    db: sequelize,
});


const app = express();
const PORT: number = 8080;
app.use(cookieParser(SESSION_SECRET));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: COOKIE_BASE_OPTIONS,
}));
sessionStore.sync();
setupPassport(User);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log("🛠 After passport.session - req.session:", req.session);
    console.log("🛠 After passport.session - req.session.passport:", req.session?.passport);
    next();
});

app.get('/', controller.getHome);

app.get('/sign-in', controller.getSignIn);
app.post('/sign-in', controller.postSignIn);

app.get('/sign-up', controller.getSignUp);
app.post('/sign-up', controller.postSignUp);

app.post('/sign-out', controller.postSignOut);

app.get('/todolist', controller.getTasks);

app.post('/todolist', controller.postTask);

app.get('/todolist/task/:id', controller.getTask);
app.put('/todolist/task/:id', controller.putTask);

app.delete('/todolist/task/:id', controller.deleteTask);

app.listen(PORT, async() => {
    await sequelize.sync();
    console.log(`Server is running on http://localhost:${PORT}`);
});