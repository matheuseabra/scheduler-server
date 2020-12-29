import { container as DIContainer } from 'tsyringe';
import AwsSESAdapter from './implementations/AwsSES.adapter';
import MailAdapter from './implementations/Mail.adapter';
import '@shared/adapters/mailTemplate';

export default {
  ethereal: DIContainer.resolve(MailAdapter),
  ses: DIContainer.resolve(AwsSESAdapter),
};
