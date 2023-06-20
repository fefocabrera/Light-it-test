import Joi from 'joi';
import { ValidationError } from '../../exceptions/exceptions'

const diagnosisConfirmationSchema = Joi.object({
    uuid: Joi.string()
        .guid({
            version: ['uuidv4', 'uuidv5']
        })
        .required(),
})

export const validateDiagnosisConfirmationInputs = (uuid: any) => {
    const { error } = diagnosisConfirmationSchema.validate({ uuid });
    if(error){
        throw new ValidationError(`Error trying to validate inputs on Diagnosis Confirmation. ${error}`);
    }
}