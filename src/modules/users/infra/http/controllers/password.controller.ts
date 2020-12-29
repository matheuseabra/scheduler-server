import { Request, Response } from 'express';
// import { container as DIContainer } from 'tsyringe';
import ForgotPasswordService from '@modules/users/services/ForgotPasswordService';
import MailAdapter from '@modules/users/adapters/mail/implementations/Mail.adapter';
import ResetPasswordService from '../../../services/ResetPasswordService';
import UsersRepository from '../../../repositories/UsersRepository';
import BcryptAdapter from '../../../adapters/bcrypt/implementations/Bcrypt.adapter';
import RecoverPasswordTokensRepository from '../../../repositories/RecoverPasswordTokensRepository';

export default class ForgotPasswordController {
  public async sendforgotPasswordEmail(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const usersRepository = new UsersRepository();
    const recoverPasswordTokenRepositoryMock = new RecoverPasswordTokensRepository();
    const mailAdapter = new MailAdapter();

    const { email } = request.body;

    const forgotPasswordService = new ForgotPasswordService(
      usersRepository,
      mailAdapter,
      recoverPasswordTokenRepositoryMock,
    );

    await forgotPasswordService.run({ email });

    return response.status(204).json();
  }

  public async resetPassword(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const usersRepository = new UsersRepository();
    const recoverPasswordTokensRepository = new RecoverPasswordTokensRepository();
    const bcryptAdapter = new BcryptAdapter();

    const { password, token } = request.body;

    const resetPasswordService = new ResetPasswordService(
      usersRepository,
      recoverPasswordTokensRepository,
      bcryptAdapter,
    );

    await resetPasswordService.run({ password, token });

    return response.status(204).json();
  }
}
