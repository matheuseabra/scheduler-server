import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';
import IAppointmentsRepository from '@modules/appointments/types/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class DayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async run({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointmentsByDay = await this.appointmentsRepository.findAllInDay({
      day,
      month,
      year,
      provider_id,
    });

    const hourStart = 8;

    const availableHoursArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const currentDate = new Date(Date.now());

    return availableHoursArray.map(hour => {
      const appointmentDate = new Date(year, month - 1, day, hour);

      const hasAppointScheduled = appointmentsByDay.find(
        appointment => getHours(appointment.date) === hour,
      );

      return {
        hour,
        available:
          !hasAppointScheduled && isAfter(appointmentDate, currentDate),
      };
    });
  }
}

export default DayAvailabilityService;
