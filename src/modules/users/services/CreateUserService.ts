import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { hash } from 'bcryptjs';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const userExists = await usersRepository.findByEmaild(email);

    if (userExists) {
      throw new AppError('E-mail in use', 400);
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
