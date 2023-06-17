import { Uuid } from "../types/Basetypes";
import { UserEntity } from "../domain/user";
import User from "../database/models/user";
import { GeneralError, AuthorizationError } from '../exceptions/exceptions';

import sequelize from '../database/index';
import { QueryTypes } from 'sequelize';

export class SymptomService {

    constructor() {}

    async getAll(userUuid: string): Promise<string> {
      try{
        // const symptoms = await getToken(user.uuid as string);
        // return symptoms;
        return ''
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