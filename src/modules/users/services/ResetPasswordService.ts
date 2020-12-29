import { inject, injectable } from 'tsyringe';
import ApiError from '@shared/errors/ApiError';
import { isAfter, addHours } from 'date-fns';
import IUsersRepository from '../types/IUsersRepository';
import IRecoverPasswordToken from '../types/IRecoverPasswordToken';
import IBcryptAdapater from '../adapters/bcrypt/interfaces/IBcrypt.adapter';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RecoverPasswordTokenRepository')
    private recoverPasswordTokenRepository: IRecoverPasswordToken,

    @inject('BcryptAdapter')
    private bcryptAdapter: IBcryptAdapater,
  ) {}

  public async run({ token, password }: IRequest): Promise<void> {
    const recoverPasswordToken = await this.recoverPasswordTokenRepository.findByToken(
      token,
    );

    if (!recoverPasswordToken)
      throw new ApiError('Reset password token is not valid');

    const expirationTime = addHours(recoverPasswordToken.created_at, 2);

    if (isAfter(Date.now(), expirationTime))
      throw new ApiError('Reset password token expired');

    const user = await this.usersRepository.findById(
      recoverPasswordToken.user_id,
    );

    if (!user) throw new ApiError('User does not exist');

    const hashedPassword = await this.bcryptAdapter.generateHash(password);

    user.password = hashedPassword;

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
