import { Uuid } from "../types/Basetypes";
import { v4 as genuuid } from 'uuid';

export class EvaluationSymptomsEntity {
    uuid?: Uuid;
    evaluationUuid: Uuid;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor({
      uuid,
      evaluationUuid,
      description,
      createdAt = new Date(),
      updatedAt = new Date()
    }: {
      uuid?: Uuid,
      evaluationUuid: Uuid,
      description: string,
      createdAt?: Date,
      updatedAt?: Date
    }) {

      this.uuid = uuid || genuuid();
      this.evaluationUuid = evaluationUuid;
      this.description = description;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
}
