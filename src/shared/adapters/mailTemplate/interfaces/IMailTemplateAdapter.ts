import IParseMailTemplateDTO from '@shared/dtos/IParseMailTemplateDTO';

export default interface IMailTemplateAdapter {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
