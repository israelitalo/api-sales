import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findByEmaild(email);

    if (!user) {
      throw new AppError('E-mail or password invalids', 401);
    }

    const passwordConfirm = await compare(password, user.password);

    if (!passwordConfirm) {
      throw new AppError('E-mail or password invalids', 401);
    }

    const token = sign({ id: user.id }, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionsService;
