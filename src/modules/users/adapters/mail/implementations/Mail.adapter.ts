import { Transporter, createTransport, getTestMessageUrl } from 'nodemailer';
import hbs from 'handlebars';
import { promises } from 'fs';
import ISendMailDTO from '@modules/users/dtos/ISendMailDTO';
// import IMailTemplateAdapter from '@shared/adapters/mailTemplate/interfaces/IMailTemplateAdapter';
import IMailAdapter from '../interfaces/IMailAdapter';

export default class MailAdapter implements IMailAdapter {
  private emailClient: Transporter;

  constructor() {
    const transporter = createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'dayna.bartell@ethereal.email',
        pass: 'QwsDqA6zEgpxqEAfXN',
      },
    });

    this.emailClient = transporter;
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData: { file, variables },
  }: ISendMailDTO): Promise<void> {
    const templateFile = await promises.readFile(file, {
      encoding: 'utf-8',
    });

    const templateParser = hbs.compile(templateFile);

    const html = templateParser(variables);

    const email = await this.emailClient.sendMail({
      from: from?.email ?? 'support@gobarber.com',
      to: to.email,
      subject,
      html,
    });

    console.log(`Message sent: ${email.messageId}`);
    console.log(`Preview URL: ${getTestMessageUrl(email)}`);
  }
}
