import { Request, Response } from 'express';
import { container as DIContainer } from 'tsyringe';
import DayAvailabilityService from '@modules/appointments/services/DayAvailabilityService';

export default class DayAvailabilityController {
  public async create(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.body;

    const dayAvailabilityService = DIContainer.resolve(DayAvailabilityService);

    const availability = await dayAvailabilityService.run({
      day,
      month,
      year,
      provider_id,
    });

    return response.status(200).json({ availability });
  }
}
