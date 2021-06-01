import { EntityRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';

@EntityRepository(Customer)
export class CustomersRepository extends Repository<Customer> {
  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = await this.findOne({ name });
    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.findOne({
      where: {
        id,
      },
    });
    return customer;
  }

  public async findByEmaild(email: string): Promise<Customer | undefined> {
    const customer = await this.findOne({ email });
    return customer;
  }
}
