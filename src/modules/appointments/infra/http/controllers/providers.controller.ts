import { Request, Response } from 'express';

import { container as DIContainer } from 'tsyringe';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const listProvidersService = DIContainer.resolve(ListProvidersService);

    const providers = listProvidersService.run({ provider_id: id });

    return response.status(200).json(providers);
  }
}
