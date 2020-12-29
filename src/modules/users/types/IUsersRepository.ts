import User from '../infra/typeorm/entities/User';
import IUserDTO from '../dtos/IUserDTO';

export default interface IUsersRepository {
  findAll(id: string): Promise<User[] | undefined>;
  findByMail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create(data: IUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
