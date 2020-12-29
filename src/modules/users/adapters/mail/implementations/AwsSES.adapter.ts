import { Transporter, createTransport } from 'nodemailer';
import { injectable, inject } from 'tsyringe';
import ISendMailDTO from '@modules/users/dtos/ISendMailDTO';
import mailConfig from '@config/mail';
import { SES } from 'aws-sdk';
import IMailAdapter from '@modules/users/adapters/mail/interfaces/IMailAdapter';
import IMailTemplateAdapter from '@shared/adapters/mailTemplate/interfaces/IMailTemplateAdapter';

@injectable()
export default class AwsSESAdapter implements IMailAdapter {
  private emailClient: Transporter;

  constructor(
    @inject('MailTemplateAdapter')
    private mailTemplateAdapter: IMailTemplateAdapter,
  ) {
    this.emailClient = createTransport({
      SES: new SES({
        region: 'us-east-1',
        apiVersion: '2010-12-01',
      }),
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { email: defaultEmail } = mailConfig.defaults.from;
    const html = await this.mailTemplateAdapter.parse(templateData);
    await this.emailClient.sendMail({
      from: from?.email || defaultEmail,
      to: to.email,
      subject,
      html,
    });
  }
}
