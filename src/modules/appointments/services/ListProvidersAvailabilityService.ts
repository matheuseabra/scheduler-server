import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '@modules/appointments/types/IAppointmentsRepository';
import IRedisCacheAdapter from '@shared/adapters/redis/interfaces/IRedisCache.adapter';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProvidersAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheAdapter')
    private cacheAdapter: IRedisCacheAdapter,
  ) {}

  public async run({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {
    const cacheKey = `providers-appointments:${provider_id}:${year}-${month}-${day}`;
    let appointments = await this.cacheAdapter.retrieve(cacheKey);

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDay({
        provider_id,
        day,
        month,
        year,
      });
    }

    await this.cacheAdapter.save(cacheKey, appointments);

    return appointments;
  }
}

export default ListProvidersAvailabilityService;
