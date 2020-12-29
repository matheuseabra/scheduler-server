import 'reflect-metadata';
import CreateUserService from '@modules/users/services/CreateUserService';
import ApiError from '@shared/errors/ApiError';
import UsersRepositoryMock from '@modules/users/infra/mocks/UsersRepository.mock';
import BcryptAdapterMock from '../adapters/bcrypt/mocks/BcryptAdapter.mock';

describe('CreateUserService', () => {
  let fakeUsersRepository: UsersRepositoryMock;
  let bcryptAdapter: BcryptAdapterMock;
  let createUserService: CreateUserService;

  beforeEach(() => {
    fakeUsersRepository = new UsersRepositoryMock();
    bcryptAdapter = new BcryptAdapterMock();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      bcryptAdapter,
    );
  });

  it(' should be able to create a new User', async () => {
    const newUser = await createUserService.run({
      name: 'John Doe',
      email: 'john@email.com',
      password: 'lakdjsaskdjlas',
    });

    expect(newUser).toHaveProperty('id');
  });

  it('should not be able to create a new User with the same email', async () => {
    const sameEmail = 'john@email.com';

    const newUser = await createUserService.run({
      name: 'John Doe',
      email: sameEmail,
      password: 'lakdjsaskdjlas',
    });

    expect(newUser).toHaveProperty('email');

    expect(
      createUserService.run({
        name: 'John Doe 2',
        email: sameEmail,
        password: 'adsasdsa',
      }),
    ).rejects.toBeInstanceOf(ApiError);
  });
});
