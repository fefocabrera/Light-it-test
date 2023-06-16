import { Uuid } from "../types/Basetypes";
import { UserEntity } from "../domain/user";
import User from "../database/models/user";
import { ValidationError, GeneralError } from '../exceptions/exceptions'
import sequelize from '../database/index';
import { QueryTypes } from 'sequelize';

export class UserService {

    constructor() {
    }

}