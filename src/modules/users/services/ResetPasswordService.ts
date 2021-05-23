import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokensRepository.findByToken(token);

    if (!userToken) throw new AppError('User Token not found');

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) throw new AppError('User not found');

    const tokenCreatedAt = userToken.created_at;

    //add 2 hours at date to create token to change password
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) throw new AppError('Token expired');

    user.password = await hash(password, 8);

    await usersRepository.save(user);
  }
}

export default ResetPasswordService;
