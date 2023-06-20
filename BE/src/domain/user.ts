import { Uuid } from "../types/Basetypes";
import { v4 as genuuid } from 'uuid';
import bcrypt from "bcrypt";

export class UserEntity {
    uuid?: Uuid;
    firstName: string;
    lastName: string;
    gender: string;
    birthdate: Date;
    username: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor({
      uuid,
      firstName,
      lastName,
      gender,
      birthdate,
      username,
      password,
      createdAt = new Date(),
      updatedAt = new Date()
    }: {
      uuid?: Uuid,
      firstName: string,
      lastName: string,
      gender: string,
      birthdate: Date,
      username: string,
      password: string,
      salt?: string,
      createdAt?: Date,
      updatedAt?: Date
    }) {

      const saltRounds = parseInt(process.env.HASH_SALT_ROUNDS || '10');

      this.uuid = uuid || genuuid();
      this.firstName = firstName;
      this.lastName = lastName;
      this.gender = gender;
      this.birthdate = birthdate;
      this.username = username;
      this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
}
