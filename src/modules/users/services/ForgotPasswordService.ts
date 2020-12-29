import { inject, injectable } from 'tsyringe';
import ApiError from '@shared/errors/ApiError';
import { resolve } from 'path';
import IUsersRepository from '../types/IUsersRepository';
import IRecoverPasswordToken from '../types/IRecoverPasswordToken';
import IMailAdapter from '../adapters/mail/interfaces/IMailAdapter';

interface IRequest {
  email: string;
}

@injectable()
class ForgotPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailAdapter')
    private mailAdapter: IMailAdapter,

    @inject('RecoverPasswordTokenRepository')
    private recoverPasswordTokenRepository: IRecoverPasswordToken,
  ) {}

  public async run({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByMail(email);

    if (!user) throw new ApiError('Email provided is not registered');

    const { token } = await this.recoverPasswordTokenRepository.generate(
      user.id,
    );

    const templateFile = resolve(
      __dirname,
      '..',
      'infra',
      'views',
      'forgot_password.hbs',
    );

    await this.mailAdapter.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      from: {
        name: user.name,
        email: user.email,
      },
      subject: '[Go Barber] Forgot Password',
      templateData: {
        file: templateFile,
        variables: {
          name: user.name,
          link: `${process.env.APP_LOCAL_URL}/resetPassword?=token=${token}`,
        },
      },
    });
  }
}

export default ForgotPasswordService;
