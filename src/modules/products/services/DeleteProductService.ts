import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

class DeleteProductService {
  public async execute(id: string): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne({ id });

    if (!product) {
      throw new AppError('Product not found.', 400);
    }

    await productRepository.remove(product);
  }
}

export default DeleteProductService;
