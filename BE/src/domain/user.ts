import { Uuid } from "../types/Basetypes";
import { v4 as genuuid } from 'uuid';

export class UserEntity {
    uuid?: Uuid;
    firstName: string;
    lastName: string;
    genre?: string;
    birthdate: Date;
    username: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor({
      uuid,
      firstName,
      lastName,
      genre,
      birthdate,
      username,
      password,
      createdAt = new Date(),
      updatedAt = new Date()
    }: {
      uuid?: Uuid,
      firstName: string,
      lastName: string,
      genre?: string,
      birthdate: Date,
      username: string,
      password: string,
      createdAt?: Date,
      updatedAt?: Date
    }) {

      this.uuid = uuid || genuuid();
      this.firstName = firstName;
      this.lastName = lastName;
      this.genre = genre;
      this.birthdate = birthdate;
      this.username = username;
      this.password = password;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
}
