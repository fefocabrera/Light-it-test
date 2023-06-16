import { Request, Response } from 'express';
import { UserService } from '../services';
import { ValidationError, GeneralError, AuthorizationError } from '../exceptions/exceptions'
import { validateRegisterInputs, validateLoginInputs } from '../utils/userValidator'

export class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async register(req: Request, res: Response) {
	try {
		const firstName = req.body?.firstName;
  		const lastName = req.body?.lastName;
		const genre = req.body?.genre;
  		const birthdate = req.body?.birthdate;
		const username = req.body?.username;
		const password = req.body?.password;
		const repeatPassword = req.body?.repeatPassword;

		validateRegisterInputs(firstName, lastName, genre, birthdate, username, password, repeatPassword);

		const birthdateDate = new Date((birthdate as string).toString());
		const token = await this.userService.register((firstName as string).trim(), (lastName as string).trim(), (genre as string).trim(), birthdateDate, (username as string).trim(), (password as string).trim());
		res.json(token)
	}
	catch (err) {
		if (err instanceof ValidationError) {
			res.status(400).send(err.message)
		} else if(err instanceof GeneralError) {
			res.status(500).send(err.message)
		}
	}
  }

  async login(req: Request, res: Response) {
	try {
		const username = req.body?.username;
		const password = req.body?.password;

		validateLoginInputs(username, password);

		const token = await this.userService.login((username as string).trim(), (password as string).trim());
		res.json(token)
	}
	catch (err) {
		if (err instanceof ValidationError) {
			res.status(400).send(err.message)
		} else if (err instanceof AuthorizationError){
			res.status(401).send(err.message)
		} else if(err instanceof GeneralError) {
			res.status(500).send(err.message)
		}
	}
  }

}