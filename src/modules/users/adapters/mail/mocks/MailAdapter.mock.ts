import ISendMailDTO from '@modules/users/dtos/ISendMailDTO';
import IMailAdapter from '../interfaces/IMailAdapter';

export default class MailAdapterMock implements IMailAdapter {
  private messages: ISendMailDTO[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}
