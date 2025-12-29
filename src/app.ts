import cookieParse from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
const app: Application = express();

app.use(express.json());
app.use(cookieParse());
app.use(cors({ origin: '*', credentials: true }));

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Server is healthy!',
    });
});

export default app;
