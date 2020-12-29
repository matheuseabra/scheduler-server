import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/types/IAppointmentsRepository';
import IAppointmentDTO from '@modules/appointments/dtos/IAppointmentDTO';
import { uuid } from 'uuidv4';
import { getMonth, getYear, getDate } from 'date-fns';
import IAvailabilityProviderDTO from '../../dtos/IAvailabilityProviderDTO';
import IDayAvailabilityDTO from '../../dtos/IDayAvailabilityDTO';

class AppointmentsRepositoryMock implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findApointment = this.appointments.find(
      appointment => appointment.date === date,
    );
    return findApointment;
  }

  public async findAvailabilityByMonth({
    provider_id,
    month,
    year,
  }: IAvailabilityProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => {
      return (
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      );
    });
    return appointments;
  }

  public async findAllInDay({
    provider_id,
    day,
    month,
    year,
  }: IDayAvailabilityDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => {
      return (
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      );
    });
    return appointments;
  }

  public async create({
    user_id,
    provider_id,
    date,
  }: IAppointmentDTO): Promise<Appointment> {
    const newAppointment = new Appointment();

    Object.assign(newAppointment, { id: uuid(), date, provider_id, user_id });

    this.appointments.push(newAppointment);

    return newAppointment;
  }
}

export default AppointmentsRepositoryMock;
