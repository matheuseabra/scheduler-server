import fs from 'fs';
import path from 'path';
import { S3 } from 'aws-sdk';
import multerConfig from '@config/multer';
import { uuid } from 'uuidv4';
import IMulterAdapter from '../interfaces/Imulter.adapter';

export default class S3Adapter implements IMulterAdapter {
  constructor(private s3Client: S3 = new S3({ region: 'us-east-1' })) {}

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(multerConfig.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalPath, {
      encoding: 'utf-8',
    });

    await this.s3Client
      .putObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${file}-${uuid()}`,
        Body: fileContent,
        ACL: 'public-read',
      })
      .promise();

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
