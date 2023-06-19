import { GeneralError, AuthorizationError, ValidationError } from '../exceptions/exceptions';
import User from "../database/models/user";
import Diagnosis from "../database/models/diagnosis";
import { Uuid } from '../types/Basetypes';
import sequelize from '../database/index';
import { QueryTypes } from 'sequelize';
import { HistoryDiagnosisDto, EvaluationDto, DiagnosisDto } from "../domain/dto/historyDiagnosisDto"

export class DiagnosisService {
  constructor() {}

    async getDiagnosisHistory(userUuid: Uuid): Promise<HistoryDiagnosisDto> {
      try{
        const user = await User.findByPk(userUuid);
        if(!user){
          throw new ValidationError(`Not exists a user with uuid: ${userUuid}`)
        }

        const query = `
          SELECT
              Evaluations.userUuid as userUuid,
              Evaluations.uuid as evaluationUuid,
              Evaluations.date as diagnosisDate,
              d.uuid as diagnosisUuid,
              d.description as diagnosisDescription,
              d.precision as diagnosisPrecision,
              d.confirmed as diagnosisConfirmed,
              GROUP_CONCAT(es.description SEPARATOR ', ') as symptomDescriptions
          FROM Evaluations
          INNER JOIN Diagnoses as d ON Evaluations.uuid = d.evaluationUuid
          INNER JOIN EvaluationSymptoms as es ON Evaluations.uuid = es.evaluationUuid
          WHERE Evaluations.userUuid = '${user.uuid}'
          GROUP BY Evaluations.userUuid, Evaluations.uuid, Evaluations.date, d.uuid, d.description, d.precision, d.confirmed
          ORDER BY 
            diagnosisDate DESC, 
            diagnosisPrecision DESC;
        `;

        const [dbResults, metadata] = await sequelize.query(query, {
          type: QueryTypes.RAW,
          raw: true,
        });

        const evaluations: EvaluationDto[] = []
        const history = new HistoryDiagnosisDto({
          userUuid: user.uuid,
          evaluations
        })

        if(dbResults?.length > 0){
          dbResults.forEach((result: any)=> {
            const evaluationIndex = evaluations.findIndex((elem: EvaluationDto) => elem?.uuid === result?.evaluationUuid);
            if(evaluationIndex === -1){
              const diagnoses: DiagnosisDto[] = [];
              const diagnosis = new DiagnosisDto({
                uuid: result?.diagnosisUuid,
                description: result?.diagnosisDescription,
                precision: result?.diagnosisPrecision,
                confirmed: result?.diagnosisConfirmed
              })
              diagnoses.push(diagnosis);

              const evaluation = new EvaluationDto({
                uuid: result?.evaluationUuid,
                date: result?.diagnosisDate,
                symptoms: result?.symptomDescriptions,
                diagnoses
              })
              history.evaluations.push(evaluation);
            } else {
              const diagnosisAlreadyExist = history.evaluations[evaluationIndex]?.diagnoses.find((elem: DiagnosisDto) => elem?.uuid === result?.diagnosisUuid);
              if(!diagnosisAlreadyExist){
                const diagnosis = new DiagnosisDto({
                  uuid: result?.diagnosisUuid,
                  description: result?.diagnosisDescription,
                  precision: result?.diagnosisPrecision,
                  confirmed: result?.diagnosisConfirmed
                })
                history.evaluations[evaluationIndex].diagnoses.push(diagnosis)
              }
            }
          })
        }

        return history;
      }
      catch (err){
        if(err instanceof AuthorizationError) {
          throw new AuthorizationError(`Error trying to evaluate symptoms. ${err}`);
        } else {
          throw new GeneralError(`Internal error trying to evaluate symptoms. ${err}`);
        }
      }
    }

    async confirmDiagnosis(userUuid: Uuid, diagnosisUuid: Uuid) {
      try{
        await validateDiagnosisExistAndBelongsToUser(userUuid, diagnosisUuid);
        await Diagnosis.update(
          {
            confirmed: true,
          },
          {
            where: {
              uuid: diagnosisUuid,
            }
          }
        )
      }
      catch (err){
        if (err instanceof ValidationError) {
          throw new ValidationError(`Error trying to confirm diagnosis. ${err}`);
        } else {
          throw new GeneralError(`Internal error trying to confirm diagnosis. ${err}`);
        }
      }
    }

}

const validateDiagnosisExistAndBelongsToUser = async (userUuid: Uuid, diagnosisUuid: Uuid) => {
  const query = `
    SELECT
      COUNT(*)
    FROM Diagnoses
    INNER JOIN Evaluations as e ON e.uuid = Diagnoses.evaluationUuid
    WHERE Diagnoses.uuid = '${diagnosisUuid}' AND e.userUuid = '${userUuid}';
  `;

  try{
    const [dbResults, metadata] = await sequelize.query(query, {
      type: QueryTypes.RAW,
      raw: true,
    });
    
    if(dbResults){
      const count = (dbResults as any)[0]['COUNT(*)'];
      if(count !== 1){
        throw new ValidationError(`Invalid diagnosis uuid.`);
      }
    }

  } catch (err){
    if(err instanceof AuthorizationError) {
      throw new AuthorizationError(`Error trying to validate if diagnosis exist and belongs to user. ${err}`);
    } else {
      throw new GeneralError(`Internal error trying to validate if diagnosis exist and belongs to user. ${err}`);
    }
  }


}
