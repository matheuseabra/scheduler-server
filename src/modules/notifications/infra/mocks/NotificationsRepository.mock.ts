import { ObjectID } from 'mongodb';
import INotificationRepository from '../../types/INotificationRepository';
import INotificationDTO from '../../dtos/INotificationDTO';
import Notification from '../typeorm/schemas/Notification';

class NotificationsRepositoryMock implements INotificationRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    user_id,
  }: INotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), content, user_id });

    this.notifications.push(notification);

    return notification;
  }
}

export default NotificationsRepositoryMock;
