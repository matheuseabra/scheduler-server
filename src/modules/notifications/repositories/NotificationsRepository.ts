import { getMongoRepository, MongoRepository } from 'typeorm';
import INotificationDTO from '../dtos/INotificationDTO';
import INotificationRepository from '../types/INotificationRepository';
import Notification from '../infra/typeorm/schemas/Notification';

class NotificationsRepository implements INotificationRepository {
  private typeormRepository: MongoRepository<Notification>;

  constructor() {
    this.typeormRepository = getMongoRepository(
      Notification,
      'gobarber-db-mongodb',
    );
  }

  public async create({
    content,
    user_id,
  }: INotificationDTO): Promise<Notification> {
    const newNotification = await this.typeormRepository.create({
      content,
      user_id,
    });

    await this.typeormRepository.save(newNotification);

    return newNotification;
  }
}

export default NotificationsRepository;
