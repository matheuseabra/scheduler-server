import fs from 'fs';
import path from 'path';
import multerConfig from '@config/multer';
import IMulterAdapter from '../interfaces/Imulter.adapter';

export default class MulterAdapter implements IMulterAdapter {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(multerConfig.tmpFolder, file),
      path.resolve(multerConfig.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(multerConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch (error) {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
