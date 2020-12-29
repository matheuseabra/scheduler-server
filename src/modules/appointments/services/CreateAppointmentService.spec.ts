import ApiError from '@shared/errors/ApiError';
import CreateAppointmentService from './CreateAppointmentService';
import AppointmentsRepositoryMock from '../infra/mocks/AppointmentsRepository.mock';
import NotificationsRepositoryMock from '../../notifications/infra/mocks/NotificationsRepository.mock';

describe('CreateAppointmentService', () => {
  let fakeAppointmentsRepository: AppointmentsRepositoryMock;
  let createAppointmentService: CreateAppointmentService;
  let notificationsRepositoryMock: NotificationsRepositoryMock;

  beforeEach(() => {
    fakeAppointmentsRepository = new AppointmentsRepositoryMock();
    notificationsRepositoryMock = new NotificationsRepositoryMock();

    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
      notificationsRepositoryMock,
    );
  });

  it('should create a new Appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 12).getTime();
    });
    const newAppointment = await createAppointmentService.run({
      date: new Date(2020, 5, 10, 13),
      provider_id: '234',
      user_id: 'asdasd',
    });

    expect(newAppointment).toHaveProperty('id');
  });

  it('should not create a Appointment within the same hour', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 11).getTime();
    });
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentService.run({
      date: appointmentDate,
      provider_id: '234',
      user_id: 'asdasd',
    });

    await expect(
      createAppointmentService.run({
        date: appointmentDate,
        provider_id: '234',
        user_id: 'asdasdasd',
      }),
    ).rejects.toBeInstanceOf(ApiError);
  });

  it('should not create a Appointment with a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.run({
        date: new Date(2020, 5, 10, 10),
        provider_id: '234',
        user_id: 'asdasdasd',
      }),
    ).rejects.toBeInstanceOf(ApiError);
  });

  it('should not create a Appointment with same user_id and provider_id', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.run({
        date: new Date(2020, 5, 10, 10),
        provider_id: 'asdasdasd',
        user_id: 'asdasdasd',
      }),
    ).rejects.toBeInstanceOf(ApiError);
  });

  it('should not create a Appointment outside business hours', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.run({
        date: new Date(2020, 5, 10, 6),
        provider_id: 'asd',
        user_id: 'asdasdasd',
      }),
    ).rejects.toBeInstanceOf(ApiError);

    await expect(
      createAppointmentService.run({
        date: new Date(2020, 5, 10, 23),
        provider_id: 'asd',
        user_id: 'asdasdasd',
      }),
    ).rejects.toBeInstanceOf(ApiError);
  });
});
