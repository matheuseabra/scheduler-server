import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentDTO from '../dtos/IAppointmentDTO';
import IAvailabilityProviderDTO from '../dtos/IAvailabilityProviderDTO';
import IDayAvailabilityDTO from '../dtos/IDayAvailabilityDTO';

export default interface IAppointmentsRepository {
  create({ provider_id, date }: IAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAvailabilityByMonth({
    provider_id,
    month,
    year,
  }: IAvailabilityProviderDTO): Promise<Appointment[]>;
  findAllInDay(data: IDayAvailabilityDTO): Promise<Appointment[]>;
}
