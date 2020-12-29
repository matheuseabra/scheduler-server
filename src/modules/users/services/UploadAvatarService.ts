import User from '@modules/users/infra/typeorm/entities/User';
import ApiError from '@shared/errors/ApiError';

import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../types/IUsersRepository';
import IMulterAdapter from '../../../shared/adapters/multer/interfaces/Imulter.adapter';

interface IRequest {
  userId: string;
  newAvatarFile: string;
}

@injectable()
class UploadAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MulterAdapter')
    private multerAdapater: IMulterAdapter,
  ) {}

  public async run({ userId, newAvatarFile }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ApiError('Only authenticated users can change avatar.', 401);
    }

    let { avatar: currentAvatar } = user;

    // Delete current avatar before updating
    if (currentAvatar) {
      await this.multerAdapater.deleteFile(currentAvatar);
    }

    const filename = await this.multerAdapater.saveFile(newAvatarFile);

    currentAvatar = filename;

    user.avatar = newAvatarFile;

    // delete user.password;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UploadAvatarService;
