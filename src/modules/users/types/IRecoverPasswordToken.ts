import RecoverPasswordToken from '../infra/typeorm/entities/RecoverPasswordToken';

export default interface IRecoverPasswordToken {
  generate(userId: string): Promise<RecoverPasswordToken>;
  findByToken(token: string): Promise<RecoverPasswordToken | undefined>;
}
