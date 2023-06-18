import express from 'express';
import { UserRoutes, SymptomRoutes, DiagnosisRoutes } from './routes';

const app = express()

const apiRouter = express.Router();
app.use('/api', apiRouter);

const userRoutes = new UserRoutes();
const symptomRoutes = new SymptomRoutes();
const diagnosisRoutes = new DiagnosisRoutes();

apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: true }));

apiRouter.use('/', userRoutes.getRouter())
apiRouter.use('/symptom', symptomRoutes.getRouter())
apiRouter.use('/diagnosis', diagnosisRoutes.getRouter())

export default app
