import { Request, Response } from 'express';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { container as DIContainer } from 'tsyringe';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createAppointmentService = DIContainer.resolve(
      CreateAppointmentService,
    );
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const newAppointment = await createAppointmentService.run({
      user_id,
      provider_id,
      date,
    });

    return response.status(200).json(newAppointment);
  }
}
