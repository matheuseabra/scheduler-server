import IUserDTO from '@modules/users/dtos/IUserDTO';
import IUsersRepository from '@modules/users/types/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import { uuid } from 'uuidv4';
import 'reflect-metadata';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const foundUser = await this.users.find(user => user.id === id);
    return foundUser;
  }

  public async findByMail(email: string): Promise<User | undefined> {
    const foundUser = await this.users.find(user => user.email === email);
    return foundUser;
  }

  public async create({ name, email, password }: IUserDTO): Promise<User> {
    const newUser = new User();

    Object.assign(newUser, { id: uuid(), name, email, password });

    this.users.push(newUser);

    return newUser;
  }

  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(u => u.id === user.id);

    this.users[userIndex] = user;

    return this.users[userIndex];
  }
}

export default FakeUsersRepository;
