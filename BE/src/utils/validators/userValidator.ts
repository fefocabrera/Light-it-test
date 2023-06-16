import Joi from 'joi';
import { ValidationError } from '../../exceptions/exceptions'

const registerSchema = Joi.object({
    firstName: Joi.string()
        .trim()
        .max(30)
        .required(),
    lastName: Joi.string()
        .trim()
        .max(30)
        .required(),
    genre: Joi.string()
        .trim()
        .valid('male', 'female'),
    birthdate : Joi.date()
        .iso()
        .min('1900-01-01')
        .max('2100-01-01')
        .required(),
    username: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .required(),
    password: Joi.string()
        .trim()
        .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
        .required(),
    repeatPassword: Joi.string()
        .trim()
        .valid(Joi.ref('password')),
})

const loginSchema = Joi.object({
    username: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .required(),
    password: Joi.string()
        .trim()
        .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
        .required(),
})

export const validateRegisterInputs = (firstName: any, lastName: any, genre: any, birthdate: any, username: any, password: any, repeatPassword: any) => {
    const { error } = registerSchema.validate({ firstName, lastName, genre, birthdate, username, password, repeatPassword });
    if(error){
        throw new ValidationError(`Error trying to validate inputs on Register. ${error}`);
    }
}

export const validateLoginInputs = (username: any, password: any) => {
    const { error } = loginSchema.validate({ username, password });
    if(error){
        throw new ValidationError(`Error trying to validate inputs on Login. ${error}`);
    }
}