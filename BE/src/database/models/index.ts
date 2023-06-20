import EvaluationSymptomsModel from './evaluationSymptoms';
import DiagnosisModel from './diagnosis';
import EvaluationModel from './evaluation';
import ExternalApiToken from './externalApiToken';
import UserModel from './user';
import * as dotenv from 'dotenv'
import { createInitialExternalApiToken } from '../populateDb';

dotenv.config({path:__dirname+'/./../../../.env'});
const isDev = process.env.NODE_ENV === 'development'

const dbMigrate = async () => {
    try {
        await UserModel.sync({ alter: isDev })
        await EvaluationModel.sync({ alter: isDev })
        await EvaluationSymptomsModel.sync({ alter: isDev })
        await DiagnosisModel.sync({ alter: isDev })
        await ExternalApiToken.sync({ alter: isDev })
        await createInitialExternalApiToken();
    } catch (err){
        console.log('Error trying to create db: ', err)
    }
}

dbMigrate();