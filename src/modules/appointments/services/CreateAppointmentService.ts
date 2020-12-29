import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { startOfHour, isBefore, getHours, format } from 'date-fns';
import ApiError from '@shared/errors/ApiError';
import INotificationRepository from '@modules/notifications/types/INotificationRepository';
import IRedisCacheAdapter from '@shared/adapters/redis/interfaces/IRedisCache.adapter';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../types/IAppointmentsRepository';

interface IRequest {
  user_id: string;
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheAdapter')
    private cacheAdapter: IRedisCacheAdapter,
  ) {}

  public async run({
    user_id,
    provider_id,
    date,
  }: IRequest): Promise<Appointment> {
    const appointmentHour = startOfHour(date);

    const hasSameHourAppointment = await this.appointmentsRepository.findByDate(
      appointmentHour,
    );

    if (hasSameHourAppointment) {
      throw new ApiError('Appointment is already scheduled');
    }

    if (getHours(appointmentHour) < 8 || getHours(appointmentHour) > 17)
      throw new ApiError('Appointment outside business hours');

    if (isBefore(appointmentHour, Date.now())) {
      throw new ApiError('Appointment schedule to a past date');
    }

    if (user_id === provider_id) {
      throw new ApiError('Appointment with same user');
    }

    const newAppointment = await this.appointmentsRepository.create({
      user_id,
      provider_id,
      date,
    });

    await this.notificationsRepository.create({
      user_id: provider_id,
      content: `A new appointment has been scheduled to date ${format(
        date,
        "MM/dd/yyyy 'at' HH'h'",
      )}`,
    });

    await this.cacheAdapter.invalidate(
      `providers-appointments:${provider_id}:${format(
        appointmentHour,
        'yyyy-M-d',
      )}`,
    );

    return newAppointment;
  }
}

export default CreateAppointmentService;
