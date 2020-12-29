import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import verifyAuthenticated from '@modules/users/infra/http/middlewares/verifyAuthenticated';
import AppointmentsController from '../controllers/appointments.controller';

const AppointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

AppointmentsRouter.use(verifyAuthenticated);

AppointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date().required(),
    },
  }),
  appointmentsController.create,
);

export default AppointmentsRouter;
