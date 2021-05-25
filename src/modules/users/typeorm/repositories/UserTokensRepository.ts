import { EntityRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

@EntityRepository(UserToken)
export class UserTokensRepository extends Repository<UserToken> {
  public async generateToken(user_id: string): Promise<UserToken> {
    const userToken = await this.create({
      user_id,
    });

    await this.save(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.findOne({ token });
    return userToken;
  }

  public async findById(id: string): Promise<UserToken | undefined> {
    const userToken = await this.findOne({ id });
    return userToken;
  }

  public async findByUserId(user_id: string): Promise<UserToken | undefined> {
    const userToken = await this.findOne({ user_id });
    return userToken;
  }
}
