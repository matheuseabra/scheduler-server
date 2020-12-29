import User from '@modules/users/infra/typeorm/entities/User';
import ApiError from '@shared/errors/ApiError';

import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../types/IUsersRepository';

interface IRequest {
  userId: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async run({ userId }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new ApiError('User not found');

    return user;
  }
}

export default ShowProfileService;
