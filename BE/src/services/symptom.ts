import { GeneralError, AuthorizationError } from '../exceptions/exceptions';
import ExternalApiService from '../utils/externalApiService'
import { SymptomDto } from "../domain/dto/symptomDto"

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

}