import { sign } from 'jsonwebtoken';
import User from '@modules/users/infra/typeorm/entities/User';
import ApiError from '@shared/errors/ApiError';
import { inject, injectable } from 'tsyringe';
import authConfig from '@config/auth';
import IUsersRepository from '../types/IUsersRepository';
import IBcryptAdapter from '../adapters/bcrypt/interfaces/IBcrypt.adapter';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('BcryptAdapter')
    private bcryptAdapter: IBcryptAdapter,
  ) {}

  public async run({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByMail(email);

    if (!user) {
      throw new ApiError('Invalid crendentials', 401);
    }

    const isPasswordMatch = await this.bcryptAdapter.compareHash(
      password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new ApiError('Invalid crendentials', 401);
    }

    const token = sign({}, authConfig.SECRET_AUTH_KEY, {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}

export default AuthenticateSessionService;
