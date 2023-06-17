import Joi from 'joi';
import { ValidationError } from '../../exceptions/exceptions'

const symptomSchema = Joi.object({
    id: Joi.number()
        .min(0)
        .integer(),
    name: Joi.string()
        .trim()
        .max(50)
        .required(),
})

export const validateEvaluationInputs = (symptoms: any) => {
    if(Array.isArray(symptoms) && symptoms.length > 0){
        symptoms.forEach(symptom => {
            const { error } = symptomSchema.validate({ id: symptom.id, name: symptom.name} );
            if(error){
                throw new ValidationError(`Error trying to validate inputs on Evaluation. ${error}`);
            }
        })
        
    } else{
        throw new ValidationError(`Error trying to validate inputs on Evaluation. Invalid Symptoms list.`);
    }
    

}