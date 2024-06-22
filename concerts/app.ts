import express from 'express';
import { concertRouter } from './routes/concert.routes';
import { errorHandler } from './middlewares/error-handler';
import cookieSession from 'cookie-session';

const app = express();
app.use(express.json());
app.set('trust proxy', true);

app.use(cookieSession({
    signed: false,
}));

app.use('/api/concert', concertRouter);

app.use(errorHandler);

export { app };