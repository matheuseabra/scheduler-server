import 'reflect-metadata';

import ApiError from '@shared/errors/ApiError';
import UsersRepositoryMock from '@modules/users/infra/mocks/UsersRepository.mock';
import ForgotPasswordService from '@modules/users/services/ForgotPasswordService';
import MailAdapterMock from '@modules/users/adapters/mail/mocks/MailAdapter.mock';
import RecoverPasswordTokenRepositoryMock from '../infra/mocks/RecoverPasswordRepository.mock';

let usersRepositoryMock: UsersRepositoryMock;
let mailAdapterMock: MailAdapterMock;
let recoverPasswordTokenRepositoryMock: RecoverPasswordTokenRepositoryMock;
let forgotPasswordService;

describe('ForgotPasswordService', () => {
  beforeEach(() => {
    usersRepositoryMock = new UsersRepositoryMock();
    mailAdapterMock = new MailAdapterMock();
    recoverPasswordTokenRepositoryMock = new RecoverPasswordTokenRepositoryMock();

    forgotPasswordService = new ForgotPasswordService(
      usersRepositoryMock,
      mailAdapterMock,
      recoverPasswordTokenRepositoryMock,
    );
  });

  it('should be able to recover forgotten password with email', async () => {
    const sendMailSpy = jest.spyOn(mailAdapterMock, 'sendMail');

    await usersRepositoryMock.create({
      name: 'Matheus',
      email: 'matheus@email.com',
      password: 'dasasdas',
    });

    await forgotPasswordService.run({ email: 'matheus@email.com' });

    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to recover password with non-existent email', async () => {
    await expect(
      forgotPasswordService.run({ email: 'no@email.com' }),
    ).rejects.toBeInstanceOf(ApiError);
  });

  it('should generate a recover password token', async () => {
    const generateSpy = jest.spyOn(
      recoverPasswordTokenRepositoryMock,
      'generate',
    );

    const user = await usersRepositoryMock.create({
      name: 'Matheus',
      email: 'matheus@email.com',
      password: 'dasasdas',
    });

    await forgotPasswordService.run({ email: 'matheus@email.com' });

    expect(generateSpy).toHaveBeenCalledWith(user.id);
  });
});
