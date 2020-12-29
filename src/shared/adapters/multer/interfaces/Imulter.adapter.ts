export default interface IMulterAdapter {
  saveFile(file: string): Promise<string>;
  deleteFile(fileId: string): Promise<void>;
}
