import { hash, compare } from 'bcryptjs';
import IBcryptAdapter from '../interfaces/IBcrypt.adapter';

export default class BcryptAdapter implements IBcryptAdapter {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
