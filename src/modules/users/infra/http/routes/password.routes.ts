import { Router } from 'express';
import ForgotPasswordController from '../controllers/password.controller';

const ForgotPasswordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();

ForgotPasswordRouter.post(
  '/forgot',
  forgotPasswordController.sendforgotPasswordEmail,
);

ForgotPasswordRouter.post('/reset', forgotPasswordController.resetPassword);

export default ForgotPasswordRouter;
