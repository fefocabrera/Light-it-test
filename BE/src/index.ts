import express from 'express';
import { UserRoutes, SymptomRoutes } from './routes';

const app = express()

const apiRouter = express.Router();
app.use('/api', apiRouter);

const userRoutes = new UserRoutes();
const symptomRoutes = new SymptomRoutes();

apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: true }));

apiRouter.use('/', userRoutes.getRouter())
apiRouter.use('/symptom', symptomRoutes.getRouter())

export default app
