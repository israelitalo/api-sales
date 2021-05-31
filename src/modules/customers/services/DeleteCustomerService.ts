import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
}

class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const costumer = await customersRepository.findById(id);

    if (!costumer) throw new AppError('Costumer not found');

    await customersRepository.remove(costumer);
  }
}

export default DeleteCustomerService;
