import { GeneralError, AuthorizationError, ValidationError } from '../exceptions/exceptions';
import ExternalApiService from '../utils/externalApiService'
import { SymptomDto } from "../domain/dto/symptomDto"
import User from "../database/models/user";
import Evaluation from "../database/models/evaluation";
import EvaluationSymptoms from "../database/models/evaluationSymptoms";
import Diagnosis from "../database/models/diagnosis";
import { Uuid } from '../types/Basetypes';

export class SymptomService {
  private readonly externalApiService: ExternalApiService;

  constructor() {
    this.externalApiService = new ExternalApiService();
  }

    async getAll(): Promise<SymptomDto[]> {
      try{
        const symptoms = await this.externalApiService.getAllSymptomsFromExternalApi();
        return symptoms;
      }
      catch (err){
        if(err instanceof AuthorizationError) {
          throw new AuthorizationError(`Error trying to get list of symptoms. ${err}`);
        } else {
          throw new GeneralError(`Internal error trying to get list of symptoms. ${err}`);
        }
      }
    }

    async evaluateSymptoms(userUuid: Uuid, symptoms: SymptomDto[]): Promise<any> {
      try{
        const user = await User.findByPk(userUuid);
        if(!user){
          throw new ValidationError(`Not exists a user with uuid: ${userUuid}`)
        }
        const diagnosis = await this.externalApiService.evaluateSymptomsOnExternalApi(symptoms, user.gender, user.birthdate);
        if(diagnosis?.length > 0){
          const evaluationEntity = await insertEvaluation(user.uuid);
          await insertEvaluationSymptoms(evaluationEntity, symptoms);
          await insertDiagnosis(evaluationEntity, diagnosis);
        }
        return diagnosis;
      }
      catch (err){
        if (err instanceof ValidationError) {
          throw new ValidationError(`Error trying to evaluate symptoms. ${err}`);
        } else if(err instanceof AuthorizationError) {
          throw new AuthorizationError(`Error trying to evaluate symptoms. ${err}`);
        } else {
          throw new GeneralError(`Internal error trying to evaluate symptoms. ${err}`);
        }
      }
    }

}

const insertEvaluation = async (userUuid: Uuid) => {
  try{
    return await Evaluation.create({ 
      userUuid: userUuid
    });
  } 
  catch (err){
    throw new Error(`Error when trying to insert evaluation entity into db. Error: ${err}`);
  }
}

const insertEvaluationSymptoms = async (evaluation: Evaluation, symptoms: SymptomDto[]) => {
  try{
    await Promise.all(symptoms.map(symptom => {
      EvaluationSymptoms.create({ 
        evaluationUuid: evaluation.uuid,
        externalApiId: symptom.id,
        description: symptom.name
      });
    }));
  } 
  catch (err){
    throw new Error(`Error when trying to insert evaluation symptoms entity into db. Error: ${err}`);
  }
}

const insertDiagnosis = async (evaluation: Evaluation, diagnosis: any) => {
  try{
    const result = await Promise.all(diagnosis.map((d: any) => {
      Diagnosis.create({ 
        evaluationUuid: evaluation.uuid,
        externalApiId: d?.Issue?.ID,
        description: d?.Issue?.Name,
        precision: d?.Issue?.Accuracy,
      });
    }));
    return result;
  } 
  catch (err){
    throw new Error(`Error when trying to insert evaluation symptoms entity into db. Error: ${err}`);
  }
}