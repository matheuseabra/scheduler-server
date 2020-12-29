import IMailTemplateAdapter from '@shared/adapters/mailTemplate/interfaces/IMailTemplateAdapter';

class MailTemplateAdapterMock implements IMailTemplateAdapter {
  public async parse(): Promise<string> {
    return 'file';
  }
}

export default MailTemplateAdapterMock;
