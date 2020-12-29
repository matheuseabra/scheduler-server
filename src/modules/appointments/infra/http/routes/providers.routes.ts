import { Router } from 'express';
import verifyAuthenticated from '@modules/users/infra/http/middlewares/verifyAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';
import ProviderAvailabilityController from '../controllers/providerAvailability.controller';
import DayAvailabilityController from '../controllers/dayAvailability.controller';
import ProvidersController from '../controllers/providers.controller';

const ProvidersRouter = Router();
const providersController = new ProvidersController();
const providerAvailabilityController = new ProviderAvailabilityController();
const dayAvailabilityController = new DayAvailabilityController();

ProvidersRouter.use(verifyAuthenticated);
ProvidersRouter.get('/', providersController.index);
ProvidersRouter.get('/appointments', providerAvailabilityController.index);
ProvidersRouter.post(
  '/:id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      day: Joi.number().required(),
      month: Joi.number().required(),
      year: Joi.number().required(),
    },
  }),
  dayAvailabilityController.create,
);
ProvidersRouter.post(
  '/:id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      month: Joi.number().required(),
      year: Joi.number().required(),
    },
  }),
  providerAvailabilityController.create,
);

export default ProvidersRouter;
