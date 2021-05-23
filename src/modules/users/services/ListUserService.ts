import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const list = await usersRepository.find();

    return list;
  }
}

export default ListUserService;
