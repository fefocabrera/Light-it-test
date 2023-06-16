import express from 'express';
import { UserRoutes } from './routes';

const app = express()

const userRoutes = new UserRoutes();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRoutes.getRouter())

export default app
