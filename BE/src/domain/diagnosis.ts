import { Uuid } from "../types/Basetypes";
import { v4 as genuuid } from 'uuid';

export class AccountEntity {
    uuid?: Uuid;
    evaluationUuid: Uuid;
    description: string;
    precision: number;
    confirmed?: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    constructor({
      uuid,
      evaluationUuid,
      description,
      precision,
      confirmed = false,
      createdAt = new Date(),
      updatedAt = new Date()
    }: {
      uuid?: Uuid,
      evaluationUuid: Uuid,
      description: string,
      precision: number,
      confirmed?: boolean,
      createdAt?: Date,
      updatedAt?: Date
    }) {

      this.uuid = uuid || genuuid();
      this.evaluationUuid = evaluationUuid;
      this.description = description;
      this.precision = precision;
      this.confirmed = confirmed;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
}
