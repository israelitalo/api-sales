import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);

    const list = await productRepository.find();

    return list;
  }
}

export default ListProductService;
