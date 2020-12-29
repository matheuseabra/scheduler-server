// import ApiError from '@shared/errors/ApiError';
import AppointmentsRepositoryMock from '../infra/mocks/AppointmentsRepository.mock';
import DayAvailabilityService from './DayAvailabilityService';

let dayAvailabilityService: DayAvailabilityService;
let appointmentsRepositoryMock: AppointmentsRepositoryMock;

describe('DayAvailabilityService', () => {
  beforeEach(() => {
    appointmentsRepositoryMock = new AppointmentsRepositoryMock();
    dayAvailabilityService = new DayAvailabilityService(
      appointmentsRepositoryMock,
    );
  });

  it('should be able to list the day availability', async () => {
    await appointmentsRepositoryMock.create({
      provider_id: 'user',
      user_id: 'xxxx-ssadsas',
      date: new Date(2020, 4, 20, 12, 0, 0),
    });

    await appointmentsRepositoryMock.create({
      provider_id: 'user',
      user_id: 'xxxx-ssadsas',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const availableHours = await dayAvailabilityService.run({
      provider_id: 'userd',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(availableHours).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 12, available: true },
        { hour: 14, available: true },
        { hour: 15, available: true },
        { hour: 16, available: true },
        { hour: 17, available: true },
      ]),
    );
  });
});
