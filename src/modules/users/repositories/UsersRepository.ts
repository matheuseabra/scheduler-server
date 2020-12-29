import { getRepository, Repository } from 'typeorm';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../types/IUsersRepository';
import IUserDTO from '../dtos/IUserDTO';

class UsersRepository implements IUsersRepository {
  private typeormRepository: Repository<User>;

  constructor() {
    this.typeormRepository = getRepository(User);
  }

  public async findAll(id: string): Promise<User[]> {
    const users = await this.typeormRepository.find({ where: { id } });
    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const foundUser = await this.typeormRepository.findOne(id);
    return foundUser;
  }

  public async findByMail(email: string): Promise<User | undefined> {
    const foundUser = await this.typeormRepository.findOne({
      where: { email },
    });
    return foundUser;
  }

  public async create({ name, email, password }: IUserDTO): Promise<User> {
    const newUser = this.typeormRepository.create({
      name,
      email,
      password,
    });
    this.typeormRepository.save(newUser);
    return newUser;
  }

  public async save(user: User): Promise<User> {
    return this.typeormRepository.save(user);
  }
}

export default UsersRepository;
