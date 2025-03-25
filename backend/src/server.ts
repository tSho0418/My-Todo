import express, { Router } from 'express';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Task from './models/task';
import sequelize from './database';
import * as controller from './controller';

const app = express();
const PORT: number = 8080;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', controller.getHome);

app.get('/sign-in', controller.getSignIn);

app.get('/todolist', controller.getTasks);

app.listen(PORT, async() => {
    await sequelize.sync({ force: true });
    console.log(`Server is running on http://localhost:${PORT}`);
});