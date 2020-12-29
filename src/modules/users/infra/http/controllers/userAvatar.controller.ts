import UploadAvatarService from '@modules/users/services/UploadAvatarService';
import { Request, Response } from 'express';
import { container as DIContainer } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class UserAvatarController {
  public async updateAvatar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const uploadAvatarService = DIContainer.resolve(UploadAvatarService);

    const user = await uploadAvatarService.run({
      userId: request.user.id,
      newAvatarFile: request.file.filename,
    });

    return response.status(200).json(classToClass(user));
  }
}
