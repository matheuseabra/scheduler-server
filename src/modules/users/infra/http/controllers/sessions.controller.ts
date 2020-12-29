import { Request, Response } from 'express';
import { container as DIContainer } from 'tsyringe';
import AuthenticateSessionService from '@modules/users/services/AuthenticateSessionService';
import { classToClass } from 'class-transformer';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateSession = DIContainer.resolve(AuthenticateSessionService);

    const { user, token } = await authenticateSession.run({
      email,
      password,
    });

    return response.status(200).json({ user: classToClass(user), token });
  }
}
