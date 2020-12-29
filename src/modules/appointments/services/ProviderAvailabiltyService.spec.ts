// import ApiError from '@shared/errors/ApiError';
import AppointmentsRepositoryMock from '../infra/mocks/AppointmentsRepository.mock';
import ProviderAvailabilityService from './ProviderAvailabilityService';

let providerAvailabilityService: ProviderAvailabilityService;
let appointmentsRepositoryMock: AppointmentsRepositoryMock;

describe('ProviderAvailabilityService', () => {
  beforeEach(() => {
    appointmentsRepositoryMock = new AppointmentsRepositoryMock();
    providerAvailabilityService = new ProviderAvailabilityService(
      appointmentsRepositoryMock,
    );
  });

  it('should list month availability from provider', async () => {
    await appointmentsRepositoryMock.create({
      provider_id: 'user',
      user_id: 'sadasdasd',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await appointmentsRepositoryMock.create({
      provider_id: 'user',
      user_id: 'sadasdasd',
      date: new Date(2020, 4, 20, 9, 0, 0),
    });

    await appointmentsRepositoryMock.create({
      provider_id: 'user',
      user_id: 'sadasdasd',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    await appointmentsRepositoryMock.create({
      provider_id: 'user',
      user_id: 'sadasdasd',
      date: new Date(2020, 4, 20, 11, 0, 0),
    });

    await appointmentsRepositoryMock.create({
      provider_id: 'user',
      user_id: 'sadasdasd',
      date: new Date(2020, 4, 20, 12, 0, 0),
    });

    await appointmentsRepositoryMock.create({
      provider_id: 'user',
      user_id: 'sadasdasd',
      date: new Date(2020, 4, 20, 13, 0, 0),
    });

    await appointmentsRepositoryMock.create({
      provider_id: 'user',
      user_id: 'sadasdasd',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await appointmentsRepositoryMock.create({
      provider_id: 'user',
      user_id: 'sadasdasd',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    await appointmentsRepositoryMock.create({
      provider_id: 'user',
      user_id: 'sadasdasd',
      date: new Date(2020, 4, 20, 16, 0, 0),
    });

    await appointmentsRepositoryMock.create({
      provider_id: 'user',
      user_id: 'sadasdasd',
      date: new Date(2020, 4, 20, 17, 0, 0),
    });

    await appointmentsRepositoryMock.create({
      provider_id: 'user',
      user_id: 'sadasdasd',
      date: new Date(2020, 4, 21, 9, 0, 0),
    });

    const providerAvailability = await providerAvailabilityService.run({
      provider_id: 'user',
      year: 2020,
      month: 5,
    });

    expect(providerAvailability).toEqual(
      expect.arrayContaining([
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
        { day: 19, available: true },
      ]),
    );
  });
});
