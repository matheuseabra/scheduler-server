import User from '@modules/users/infra/typeorm/entities/User';
import ApiError from '@shared/errors/ApiError';
import { inject, injectable } from 'tsyringe';
import IRedisCacheAdapter from '@shared/adapters/redis/interfaces/IRedisCache.adapter';
import IUsersRepository from '../types/IUsersRepository';
import IBcryptAdapter from '../adapters/bcrypt/interfaces/IBcrypt.adapter';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('BcryptAdapter')
    private bcryptAdapter: IBcryptAdapter,

    @inject('RedisCacheAdapter')
    private redisCacheAdapater: IRedisCacheAdapter,
  ) {}

  public async run({ name, email, password }: IRequest): Promise<User> {
    if (await this.usersRepository.findByMail(email))
      throw new ApiError(`User with email ${email} already registered`);

    const hashedPassword = await this.bcryptAdapter.generateHash(password);

    const newUser = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.usersRepository.save(newUser);

    await this.redisCacheAdapater.invalidateByPrefix(`providers-list`);

    return newUser;
  }
}

export default CreateUserService;
