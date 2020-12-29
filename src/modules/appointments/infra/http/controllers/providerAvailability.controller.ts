import { Request, Response } from 'express';
import { container as DIContainer } from 'tsyringe';
import ProviderAvailabilityService from '@modules/appointments/services/ProviderAvailabilityService';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProviderAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.body;

    const listProvidersService = DIContainer.resolve(ListProvidersService);

    const appointments = await listProvidersService.run({
      provider_id,
      day,
      month,
      year,
    });

    return response.status(200).json(appointments);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, month, year } = request.body;

    const providerAvailabilityService = DIContainer.resolve(
      ProviderAvailabilityService,
    );

    const availability = await providerAvailabilityService.run({
      month,
      year,
      provider_id,
    });

    return response.status(200).json({ availability });
  }
}
