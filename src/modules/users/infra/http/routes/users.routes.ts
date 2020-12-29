import { Router } from 'express';
import * as multer from 'multer';
import multerConfig from '@config/multer';
import { celebrate, Segments, Joi } from 'celebrate';
import verifyAuthenticated from '@modules/users/infra/http/middlewares/verifyAuthenticated';
import UsersController from '../controllers/users.controller';
import UserAvatarController from '../controllers/userAvatar.controller';

const upload = multer(multerConfig);

const UsersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

UsersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

UsersRouter.get('/profile', verifyAuthenticated, usersController.show);

UsersRouter.put('/profile', verifyAuthenticated, usersController.update);

UsersRouter.patch(
  '/profile/avatar',
  verifyAuthenticated,
  upload.single('avatar'),
  usersAvatarController.updateAvatar,
);

export default UsersRouter;
