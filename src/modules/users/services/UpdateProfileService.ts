import User from '@modules/users/infra/typeorm/entities/User';
import ApiError from '@shared/errors/ApiError';

import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../types/IUsersRepository';
import IBcryptAdapter from '../adapters/bcrypt/interfaces/IBcrypt.adapter';

interface IRequest {
  userId: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('BcryptAdapter')
    private bcryptAdapter: IBcryptAdapter,
  ) {}

  public async run({
    userId,
    name,
    email,
    password,
    oldPassword,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    const userWithEmail = await this.usersRepository.findByMail(email);

    if (userWithEmail && userWithEmail.id !== userId)
      throw new ApiError(`E-mail is already in use.`);

    if (!user) throw new ApiError(`User not found with id ${userId}.`);

    if (password && !oldPassword)
      throw new ApiError(`Confirming old password is needed.`);

    if (password && oldPassword) {
      const isValidOldPassword = await this.bcryptAdapter.compareHash(
        oldPassword,
        user.password,
      );

      if (!isValidOldPassword) throw new ApiError(`Password does not match.`);
    }

    user.name = name;
    user.email = email;
    user.password = await this.bcryptAdapter.generateHash(password);

    return user;
  }
}

export default UpdateProfileService;
