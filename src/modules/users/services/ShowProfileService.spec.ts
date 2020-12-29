import UsersRepositoryMock from '@modules/users/infra/mocks/UsersRepository.mock';
import ApiError from '@shared/errors/ApiError';
import ShowProfileService from './ShowProfileService';

describe('ShowProfileService', () => {
  let usersRepositoryMock;
  let showProfileService;

  beforeEach(() => {
    usersRepositoryMock = new UsersRepositoryMock();
    showProfileService = new ShowProfileService(usersRepositoryMock);
  });

  it('should be able to show user profile', async () => {
    const user = await usersRepositoryMock.create({
      name: 'test',
      email: 'test@email.com',
      password: 'testNewPassword',
    });

    const profile = await showProfileService.run({
      userId: user.id,
    });

    expect(profile.name).toContain('test');
    expect(profile.email).toContain('test@email.com');
  });

  it('should not show user profile with wrong userId', async () => {
    await usersRepositoryMock.create({
      name: 'test',
      email: 'test@email.com',
      password: 'testNewPassword',
    });

    expect(
      showProfileService.run({
        userId: 'asdasdsa',
      }),
    ).rejects.toBeInstanceOf(ApiError);
  });
});
