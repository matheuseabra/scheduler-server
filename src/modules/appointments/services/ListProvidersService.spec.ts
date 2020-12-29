import AppointmentsRepositoryMock from '../infra/mocks/AppointmentsRepository.mock';
import ListProvidersService from './ListProvidersService';

let appointmentsRepositoryMock: AppointmentsRepositoryMock;
let listProvidersService: ListProvidersService;

describe('DayAvailabilityService', () => {
  beforeEach(() => {
    appointmentsRepositoryMock = new AppointmentsRepositoryMock();
    listProvidersService = new ListProvidersService(appointmentsRepositoryMock);
  });

  it('should be able to list the providers appointments', async () => {
    const appointment1 = await appointmentsRepositoryMock.create({
      provider_id: 'provider-test',
      user_id: 'user-test',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    const appointment2 = await appointmentsRepositoryMock.create({
      provider_id: 'provider-test',
      user_id: 'user-test',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    const appointments = await listProvidersService.run({
      provider_id: 'provider-test',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(appointments).toEqual(
      expect.arrayContaining([appointment1, appointment2]),
    );
  });
});
