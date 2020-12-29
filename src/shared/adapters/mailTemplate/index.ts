import { container as DIContainer } from 'tsyringe';
import IMailTemplateAdapter from './interfaces/IMailTemplateAdapter';
import HandlebarsAdapter from './implementations/HandlebarsAdapter';

DIContainer.registerSingleton<IMailTemplateAdapter>(
  'MailTemplateAdapter',
  HandlebarsAdapter,
);
