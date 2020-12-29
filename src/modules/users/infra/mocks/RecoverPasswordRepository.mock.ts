import { uuid } from 'uuidv4';
import 'reflect-metadata';
import IRecoverPasswordToken from '../../types/IRecoverPasswordToken';
import RecoverPasswordToken from '../typeorm/entities/RecoverPasswordToken';

class RecoverPasswordTokenRepositoryMock implements IRecoverPasswordToken {
  private recoverPasswordTokens: RecoverPasswordToken[] = [];

  public async generate(userId: string): Promise<RecoverPasswordToken> {
    const newRecoverPasswordToken = new RecoverPasswordToken();

    Object.assign(newRecoverPasswordToken, {
      id: uuid(),
      token: uuid(),
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.recoverPasswordTokens.push(newRecoverPasswordToken);

    return newRecoverPasswordToken;
  }

  public async findByToken(
    providedToken: string,
  ): Promise<RecoverPasswordToken | undefined> {
    return this.recoverPasswordTokens.find(
      ({ token }) => token === providedToken,
    );
  }
}

export default RecoverPasswordTokenRepositoryMock;
