import { Request, Response } from 'express';
import { UserService } from '../services';
import { manageExceptions } from '../exceptions/exceptions'
import { validateRegisterInputs, validateLoginInputs } from '../utils/validators/userValidator'

export class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async register(req: Request, res: Response) {
	try {
		const firstName = req.body?.firstName;
  		const lastName = req.body?.lastName;
		const gender = req.body?.gender;
  		const birthdate = req.body?.birthdate;
		const username = req.body?.username;
		const password = req.body?.password;
		const repeatPassword = req.body?.repeatPassword;

		validateRegisterInputs(firstName, lastName, gender, birthdate, username, password, repeatPassword);

		const birthdateDate = new Date((birthdate as string).toString());
		const token = await this.userService.register((firstName as string).trim(), (lastName as string).trim(), (gender as string).trim(), birthdateDate, (username as string).trim(), (password as string).trim());
		res.json(token)
	}
	catch (err) {
		manageExceptions(err, res);
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
		manageExceptions(err, res);
	}
  }

}