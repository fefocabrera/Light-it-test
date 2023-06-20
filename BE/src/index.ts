import express from 'express';
import { UserRoutes, SymptomRoutes, DiagnosisRoutes } from './routes';
import cors from 'cors';

const app = express()
const frontendAppUrl = process.env.FRONTEND_APP_URL || 'http://localhost:8080/';

const apiRouter = express.Router();
app.use('/api', apiRouter);
app.use(cors({
    origin: frontendAppUrl, 
    optionsSuccessStatus: 200
}));

const userRoutes = new UserRoutes();
const symptomRoutes = new SymptomRoutes();
const diagnosisRoutes = new DiagnosisRoutes();

apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: true }));

apiRouter.use('/', userRoutes.getRouter())
apiRouter.use('/symptom', symptomRoutes.getRouter())
apiRouter.use('/diagnosis', diagnosisRoutes.getRouter())

export default app
