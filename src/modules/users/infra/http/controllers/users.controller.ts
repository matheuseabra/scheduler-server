import CreateUserService from '@modules/users/services/CreateUserService';
import { Request, Response } from 'express';
import { container as DIContainer } from 'tsyringe';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import { classToClass } from 'class-transformer';
import ShowProfileService from '../../../services/ShowProfileService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUserService = DIContainer.resolve(CreateUserService);

    const newUser = await createUserService.run({ name, email, password });

    delete newUser.password;

    return response.status(200).json(newUser);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const showProfileService = DIContainer.resolve(ShowProfileService);

    const user = await showProfileService.run({ userId });

    return response.status(200).json({ user: classToClass(user) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, oldPassword } = request.body;
    const updateProfileService = DIContainer.resolve(UpdateProfileService);

    const updatedUser = await updateProfileService.run({
      userId: request.user.id,
      name,
      email,
      password,
      oldPassword,
    });

    return response
      .status(204)
      .json({ updatedUser: classToClass(updatedUser) });
  }
}
