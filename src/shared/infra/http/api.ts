import * as dotenv from 'dotenv';
import * as express from 'express';
import * as cors from 'cors';
import 'express-async-errors';
import { Request, Response, NextFunction } from 'express';
import '@shared/infra/typeorm';
import '@shared/container';
import multerConfig from '@config/multer';
import routes from './routes';
import ApiError from '../../errors/ApiError';

dotenv.config();

const api = express();

api.use(cors());
api.use(express.json());
api.use('/files', express.static(multerConfig.tmpFolder));
api.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof ApiError)
    response.status(err.statusCode).json({ error: err.message });

  console.error(`Unhandled error: ${err}`);

  return response.status(500).json({ error: 'Internal server error. ' });
});

api.use(routes);

export default api;
