import { container as DIContainer } from 'tsyringe';
import IBcryptAdapter from '@modules/users/adapters/bcrypt/interfaces/IBcrypt.adapter';
import BcryptAdapter from '@modules/users/adapters/bcrypt/implementations/Bcrypt.adapter';

DIContainer.registerSingleton<IBcryptAdapter>('BcryptAdapter', BcryptAdapter);
