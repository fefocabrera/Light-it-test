import { Uuid } from "../types/Basetypes";
import { v4 as genuuid } from 'uuid';

export class EvaluationEntity {
  uuid?: Uuid;
  userUuid: Uuid;
  date?: Date;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({
    uuid,
    userUuid,
    date = new Date(),
    createdAt = new Date(),
    updatedAt = new Date()
  }: {
    uuid?: Uuid,
    userUuid: Uuid,
    date?: Date,
    createdAt?: Date,
    updatedAt?: Date
  }) {

    this.uuid = uuid || genuuid();
    this.userUuid = userUuid;
    this.date = date;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
