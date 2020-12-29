import { container as DIContainer } from 'tsyringe';
import IMulterAdapter from './interfaces/Imulter.adapter';
import MulterAdapter from './implementations/Multer.adapter';
import S3Adapter from './implementations/S3.adapter';

const storageAdapters = {
  disk: MulterAdapter,
  s3: S3Adapter,
};

DIContainer.registerSingleton<IMulterAdapter>(
  'MulterAdapter',
  storageAdapters.disk,
);
