import express from 'express';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
const PORT: number = 8080;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'ホーム画面（レスポンスデータ）' });
});

app.get('/sign-in', (req: Request, res: Response) => {
    res.json({ message: '認証画面（レスポンスデータ）' });
});

app.get('/todolist', (req: Request, res: Response) => {
    res.json({ tasks: ['task1', 'task2', 'task3'] });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});