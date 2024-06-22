import express from 'express';
import { userRouter } from './routes/user.routes';
import { errorHandler } from './middlewares/error-handler';
import cookieSession from 'cookie-session';

const app = express();
app.use(express.json());
app.set('trust proxy', true);

app.use(cookieSession({
    signed: false,
}));

app.use('/api/users', userRouter);

app.use(errorHandler);

export { app };