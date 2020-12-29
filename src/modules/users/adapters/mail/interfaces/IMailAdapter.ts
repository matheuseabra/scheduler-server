import ISendMailDTO from '@modules/users/dtos/ISendMailDTO';

export default interface IMailAdapter {
  sendMail({ to, from, subject, templateData }: ISendMailDTO): Promise<void>;
}
