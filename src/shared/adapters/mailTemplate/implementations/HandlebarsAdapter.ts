import handlebars from 'handlebars';
import IMailTemplateAdapter from '@shared/adapters/mailTemplate/interfaces/IMailTemplateAdapter';
import IParseMailTemplateDTO from '@shared/dtos/IParseMailTemplateDTO';
import fs from 'fs';

class HandlebarsAdapter implements IMailTemplateAdapter {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFile = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const templateParser = handlebars.compile(templateFile);

    return templateParser(variables);
  }
}

export default HandlebarsAdapter;
