import { getRepository, Repository } from 'typeorm';
import IRecoverPasswordToken from '../types/IRecoverPasswordToken';
import RecoverPasswordToken from '../infra/typeorm/entities/RecoverPasswordToken';

export default class RecoverPasswordTokensRepository
  implements IRecoverPasswordToken {
  private recoverPasswordTokenRepository: Repository<RecoverPasswordToken>;

  constructor() {
    this.recoverPasswordTokenRepository = getRepository(RecoverPasswordToken);
  }

  public async findByToken(
    token: string,
  ): Promise<RecoverPasswordToken | undefined> {
    const forgotPasswordToken = await this.recoverPasswordTokenRepository.findOne(
      {
        where: { token },
      },
    );

    if (!forgotPasswordToken) return undefined;

    return forgotPasswordToken;
  }

  public async generate(userId: string): Promise<RecoverPasswordToken> {
    const forgotPasswordToken = this.recoverPasswordTokenRepository.create({
      user_id: userId,
    });

    await this.recoverPasswordTokenRepository.save(forgotPasswordToken);

    return forgotPasswordToken;
  }
}
