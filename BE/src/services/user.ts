import { UserEntity } from "../domain/user";
import User from "../database/models/user";
import { ValidationError, GeneralError, AuthorizationError } from '../exceptions/exceptions';
import { validatePassword } from '../utils/validators/passwordValidator';
import { getToken } from '../utils/tokenManager';

export class UserService {

    constructor() {}

    async register(firstName: string, lastName: string, genre: string, birthdate: Date, username: string, password: string): Promise<string> {
      try{
        await validateUserNotExist(username);

        const user = new UserEntity(
          {
            firstName, 
            lastName,
            genre,
            birthdate,
            username,
            password
          }
        )
        await insertUser(user);
        const token = await getToken(user.uuid as string);
        return token;
      }
      catch (err){
        if (err instanceof ValidationError) {
          throw new ValidationError(`Error trying to register. ${err}`);
        } else {
          throw new GeneralError(`Internal error trying to register. ${err}`);
        }
      }
    }

    async login(username: string, password: string): Promise<string> {
      try{
        const user = await validateUser(username, password);

        const token = await getToken(user.uuid as string);
        return token;
      }
      catch (err){
        if (err instanceof ValidationError) {
          throw new ValidationError(`Error trying to login. ${err}`);
        } else if(err instanceof AuthorizationError) {
          throw new AuthorizationError(`Error trying to login. ${err}`);
        } else {
          throw new GeneralError(`Internal error trying to login. ${err}`);
        }
      }
    }

}

const validateUserNotExist = async (username: string) => {
  const user = await User.findOne({ where: { username } })
  if(user){
    throw new ValidationError(`Already an existing user with username: ${username}`)
  }
}

const insertUser = async (user: UserEntity) => {
  try{
    await User.create({ 
      uuid: user.uuid,
      firstName: user.firstName,
      lastName: user.lastName,
      genre: user.genre,
      birthdate: user.birthdate,
      username: user.username,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } 
  catch (err){
    throw new Error(`Error when trying to insert user into db. Error: ${err}`);
  }
}

const validateUser = async (username: string, password: string): Promise<User>  => {
  try{
    const user = await User.findOne({ where: { username } })
    if(user){
      await validatePassword(password, user.password);
      return user;
    } else {
      throw new AuthorizationError(`Invalid username.`);
    }
  } catch(err){
    throw new AuthorizationError('Invalid username or password.')
  }
}