import { getRepository, Repository, Raw } from 'typeorm';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../types/IAppointmentsRepository';
import IAppointmentDTO from '../dtos/IAppointmentDTO';
import IAvailabilityProviderDTO from '../dtos/IAvailabilityProviderDTO';
import IDayAvailabilityDTO from '../dtos/IDayAvailabilityDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private typeormRepository: Repository<Appointment>;

  constructor() {
    this.typeormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const sameDateAppointment = await this.typeormRepository.findOne({
      where: { date },
    });

    return sameDateAppointment;
  }

  public async findAvailabilityByMonth({
    provider_id,
    month,
    year,
  }: IAvailabilityProviderDTO): Promise<Appointment[]> {
    const parsedMonth = Number(String(month).padStart(2, '0'));
    const appointments = await this.typeormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateField =>
            `to_char(${dateField}, 'MM-YYYY') = '${parsedMonth - year}'`,
        ),
      },
    });
    return appointments;
  }

  public async findAllInDay({
    provider_id,
    day,
    month,
    year,
  }: IDayAvailabilityDTO): Promise<Appointment[]> {
    const formattedDay = Number(String(day).padStart(2, '0'));
    const formattedMonth = Number(String(month).padStart(2, '0'));
    const appointments = await this.typeormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateField =>
            `to_char(${dateField}, 'DD-MM-YYYY') = '${
              formattedDay - formattedMonth - year
            }'`,
        ),
      },
    });
    return appointments;
  }

  public async create({
    user_id,
    provider_id,
    date,
  }: IAppointmentDTO): Promise<Appointment> {
    const newAppointment = this.typeormRepository.create({
      user_id,
      provider_id,
      date,
    });
    this.typeormRepository.save(newAppointment);
    return newAppointment;
  }
}

export default AppointmentsRepository;
