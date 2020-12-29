import 'reflect-metadata';

import ApiError from '@shared/errors/ApiError';
import AuthenticateSessionService from '@modules/users/services/AuthenticateSessionService';
import CreateUserService from '@modules/users/services/CreateUserService';
import UsersRepositoryMock from '@modules/users/infra/mocks/UsersRepository.mock';
import BcryptAdapterMock from '../adapters/bcrypt/mocks/BcryptAdapter.mock';

describe('AutenticateSessionService', () => {
  let fakeUsersRepository;
  let bcryptAdapter;
  let createUserService;
  let authenticateSessionService;

  beforeEach(() => {
    fakeUsersRepository = new UsersRepositoryMock();
    bcryptAdapter = new BcryptAdapterMock();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      bcryptAdapter,
    );

    authenticateSessionService = new AuthenticateSessionService(
      fakeUsersRepository,
      bcryptAdapter,
    );
  });

  it('should be able to autenticate a Session', async () => {
    await createUserService.run({
      name: 'test',
      password: 'test123',
      email: 'test@email.com',
    });

    const response = await authenticateSessionService.run({
      password: 'test123',
      email: 'test@email.com',
    });

    expect(response).toHaveProperty('token');
  });

  it('should not authenticate with unregistered user', async () => {
    expect(
      authenticateSessionService.run({
        password: 'test',
        email: 'test@email.com',
      }),
    ).rejects.toBeInstanceOf(ApiError);
  });

  it('should not authenticate with invalid credentials', async () => {
    await createUserService.run({
      name: 'test',
      password: 'test123',
      email: 'test@email.com',
    });

    expect(
      authenticateSessionService.run({
        password: 'test',
        email: 'test@email.com',
      }),
    ).rejects.toBeInstanceOf(ApiError);
  });
});
