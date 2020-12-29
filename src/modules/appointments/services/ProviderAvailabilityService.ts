import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';
import IAppointmentsRepository from '@modules/appointments/types/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ProviderAvailabilityService {
  private appointsmentsPerDay = 10;

  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async run({ provider_id, month, year }: IRequest): Promise<IResponse> {
    const availableAppointments = await this.appointmentsRepository.findAvailabilityByMonth(
      { month, year, provider_id },
    );

    const monthArray = Array.from(
      {
        length: getDaysInMonth(new Date(year, month - 1)),
      },
      (_, index) => index + 1,
    );

    return monthArray.map(day => {
      const appointmentsInDay = availableAppointments.filter(
        appointment => getDate(appointment.date) === day,
      );
      return {
        day,
        available: appointmentsInDay.length < this.appointsmentsPerDay,
      };
    });
  }
}

export default ProviderAvailabilityService;
