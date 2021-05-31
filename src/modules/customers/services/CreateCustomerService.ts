import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const userExists = await customersRepository.findByEmaild(email);

    if (userExists) {
      throw new AppError('E-mail in use', 400);
    }

    const costumer = customersRepository.create({
      name,
      email,
    });

    await customersRepository.save(costumer);

    return costumer;
  }
}

export default CreateCustomerService;
