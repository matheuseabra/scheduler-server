import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import IRedisCacheAdapter from '@shared/adapters/redis/interfaces/IRedisCache.adapter';
import IUsersRepository from '@modules/users/types/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  provider_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheAdapter')
    private cacheAdapter: IRedisCacheAdapter,
  ) {}

  public async run({ provider_id }: IRequest): Promise<User[] | string> {
    const key = `providers-list:${provider_id}`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let users: any = await this.cacheAdapter.retrieve(key);

    if (!users) {
      users = await this.usersRepository.findAll(provider_id);

      await this.cacheAdapter.save(key, users);
    }

    return users;
  }
}

export default ListProvidersService;
