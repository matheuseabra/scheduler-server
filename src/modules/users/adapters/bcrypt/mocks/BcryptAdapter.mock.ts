import IBcryptAdapter from '../interfaces/IBcrypt.adapter';

export default class BcryptAdapterMock implements IBcryptAdapter {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}
