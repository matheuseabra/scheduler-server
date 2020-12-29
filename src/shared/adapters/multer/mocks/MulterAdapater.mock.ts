import IMulterAdapter from '../interfaces/Imulter.adapter';

export default class MulterAdapterMock implements IMulterAdapter {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const fileIndex = this.storage.findIndex(storage => storage === file);

    this.storage.splice(fileIndex, 1);
  }
}
