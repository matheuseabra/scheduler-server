import { container as DIContainer } from 'tsyringe';
import IAppointmentsRepository from '@modules/appointments/types/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';
import IUsersRepository from '@modules/users/types/IUsersRepository';
import UsersRepository from '@modules/users/repositories/UsersRepository';
import IRecoverPasswordToken from '@modules/users/types/IRecoverPasswordToken';
import RecoverPasswordTokensRepository from '@modules/users/repositories/RecoverPasswordTokensRepository';
import INotificationRepository from '@modules/notifications/types/INotificationRepository';
import NotificationsRepository from '@modules/notifications/repositories/NotificationsRepository';
import '@modules/users/adapters/bcrypt';
import '@modules/users/adapters/mail';
import '@shared/adapters/multer';
import '@shared/adapters/redis';

DIContainer.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

DIContainer.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

DIContainer.registerSingleton<INotificationRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);

DIContainer.registerSingleton<IRecoverPasswordToken>(
  'RecoverPasswordTokensRepository',
  RecoverPasswordTokensRepository,
);
