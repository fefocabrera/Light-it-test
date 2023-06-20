import { Request, Response } from 'express';
import { DiagnosisService } from '../services';
import { manageExceptions } from '../exceptions/exceptions'
import { Uuid } from '../types/Basetypes';
import { validateDiagnosisConfirmationInputs } from '../utils/validators/diagnosisValidator'

export class DiagnosisController {
  private readonly diagnosisService: DiagnosisService;

  constructor() {
    this.diagnosisService = new DiagnosisService();
  }

  async getDiagnosisHistory(req: Request, res: Response) {
	try {
		const userUuid = req.headers.userUuid;

        const evaluation = await this.diagnosisService.getDiagnosisHistory(userUuid as Uuid);
		res.json(evaluation)
	}
	catch (err) {
		manageExceptions(err, res);
	}
  }

  async confirmDiagnosis(req: Request, res: Response) {
	try {
		const userUuid = req.headers.userUuid;
		const uuid = req.params?.uuid;

		validateDiagnosisConfirmationInputs(uuid);

        await this.diagnosisService.confirmDiagnosis(userUuid as Uuid, uuid as Uuid);
		res.status(200).send(`Diagnosis with uuid ${uuid} has been confirmed.`)
	}
	catch (err) {
		manageExceptions(err, res);
	}
  }

}