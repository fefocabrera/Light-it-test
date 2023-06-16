import { Request, Response } from 'express';
import { UserService } from '../services';
import { ValidationError, GeneralError } from '../exceptions/exceptions'

export class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }


}