import 'reflect-metadata';

import ApiError from '@shared/errors/ApiError';
import UsersRepositoryMock from '@modules/users/infra/mocks/UsersRepository.mock';
import UploadAvatarService from '@modules/users/services/UploadAvatarService';
import MulterAdapterMock from '../../../shared/adapters/multer/mocks/MulterAdapater.mock';

describe('UploadAvatarService', () => {
  let usersRepositoryMock;
  let multerAdapterMock;
  let uploadAvatarService;

  beforeEach(() => {
    usersRepositoryMock = new UsersRepositoryMock();
    multerAdapterMock = new MulterAdapterMock();

    uploadAvatarService = new UploadAvatarService(
      usersRepositoryMock,
      multerAdapterMock,
    );
  });

  it('should update a user avatar ', async () => {
    const newUser = await usersRepositoryMock.create({
      name: 'John Doe',
      email: 'john@email.com',
      password: 'lakdjsaskdjlas',
    });

    await uploadAvatarService.run({
      userId: newUser.id,
      newAvatarFile: 'avatar.jpg',
    });

    expect(newUser.avatar).toBe('avatar.jpg');
  });

  it('should not update avatar', async () => {
    expect(
      uploadAvatarService.run({
        userId: 'no-existing-user',
        newAvatarFile: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(ApiError);
  });

  it('should delete old avatar when updating a new one', async () => {
    const deleteFileSpy = jest.spyOn(multerAdapterMock, 'deleteFile');

    const newUser = await usersRepositoryMock.create({
      name: 'John Doe',
      email: 'john@email.com',
      password: 'lakdjsaskdjlas',
    });

    await uploadAvatarService.run({
      userId: newUser.id,
      newAvatarFile: 'avatar.jpg',
    });

    await uploadAvatarService.run({
      userId: newUser.id,
      newAvatarFile: 'avatar2.jpg',
    });

    expect(deleteFileSpy).toHaveBeenCalledWith('avatar.jpg');
    expect(newUser.avatar).toBe('avatar2.jpg');
  });
});
