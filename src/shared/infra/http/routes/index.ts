import { Router } from 'express';

import AppointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import UsersRouter from '@modules/users/infra/http/routes/users.routes';
import SessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import ForgotPasswordRouter from '@modules/users/infra/http/routes/password.routes';
import ProvidersRouter from '@modules/appointments/infra/http/routes/providers.routes';

const routes = Router();

routes.use('/sessions', SessionsRouter);
routes.use('/appointments', AppointmentsRouter);
routes.use('/providers', ProvidersRouter);
routes.use('/users', UsersRouter);
routes.use('/password', ForgotPasswordRouter);

export default routes;
