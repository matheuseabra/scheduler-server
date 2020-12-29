import UsersRepositoryMock from '@modules/users/infra/mocks/UsersRepository.mock';
import ApiError from '@shared/errors/ApiError';
import UpdateProfileService from './UpdateProfileService';
import BcryptAdapterMock from '../adapters/bcrypt/mocks/BcryptAdapter.mock';

describe('UpdateProfileService', () => {
  let updateProfileService;
  let usersRepositoryMock;
  let bcryptAdapterMock;

  beforeEach(() => {
    usersRepositoryMock = new UsersRepositoryMock();
    bcryptAdapterMock = new BcryptAdapterMock();
    updateProfileService = new UpdateProfileService(
      usersRepositoryMock,
      bcryptAdapterMock,
    );
  });

  it('should be able to update the user profile', async () => {
    const currentUser = await usersRepositoryMock.create({
      name: 'test',
      email: 'test@email.com',
      password: 'testNewPassword',
    });

    const updatedUser = await updateProfileService.run({
      userId: currentUser.id,
      name: 'New name test',
      email: 'emailTest@email.com',
    });

    expect(updatedUser.name).toContain('New name test');
    expect(updatedUser.email).toContain('emailTest@email.com');
  });

  it('should not be able to update the profile with another user email', async () => {
    await usersRepositoryMock.create({
      name: 'test',
      email: 'test@email.com',
      password: 'testNewPassword',
    });

    const currentUser = await usersRepositoryMock.create({
      name: 'john doe',
      email: 'john@email.com',
      password: '12345',
    });

    await expect(
      updateProfileService.run({
        userId: currentUser.id,
        email: 'test@email.com',
      }),
    ).rejects.toBeInstanceOf(ApiError);
  });

  it('should be able to update the password', async () => {
    const currentUser = await usersRepositoryMock.create({
      name: 'test',
      email: 'test@email.com',
      password: '123',
    });

    const updatedUser = await updateProfileService.run({
      userId: currentUser.id,
      password: '123456',
      oldPassword: '123',
    });

    expect(updatedUser.password).toContain('123456');
  });

  it('should not be able to update the password without confirming old password', async () => {
    const currentUser = await usersRepositoryMock.create({
      name: 'test',
      email: 'test@email.com',
      password: '123',
    });

    await expect(
      updateProfileService.run({
        userId: currentUser.id,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(ApiError);
  });

  it('should not be able to update the password with wrong password', async () => {
    const currentUser = await usersRepositoryMock.create({
      name: 'test',
      email: 'test@email.com',
      password: '123',
    });

    await expect(
      updateProfileService.run({
        userId: currentUser.id,
        password: '123456',
        oldPassword: 'xxxxxx',
      }),
    ).rejects.toBeInstanceOf(ApiError);
  });
});
