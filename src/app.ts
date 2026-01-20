import { toNodeHandler } from 'better-auth/node';
import cookieParse from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import config from './config';
import { auth } from './lib/auth';
import globalErrorHandler from './middlewares/globalErrorHandler.middleware';
import notFound from './middlewares/notFound.middleware';
import router from './router';
const app: Application = express();

app.use(cors({ origin: [config.APP_URL], credentials: true }));
app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(express.json());
app.use(cookieParse());

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Server is healthy!',
    });
});

app.use('/api/v1', router);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
