import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

class ShowProductService {
  public async execute(id: string): Promise<Product | undefined> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne({ id });

    if (!product) {
      throw new AppError('Product not found.', 400);
    }

    return product;
  }
}

export default ShowProductService;
