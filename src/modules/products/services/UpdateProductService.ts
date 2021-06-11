import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne({ id });

    const redisCache = new RedisCache();

    if (!product) {
      throw new AppError('Product not found.', 400);
    }

    const productExists = await productRepository.findOne({ name });

    // if (productExists) {
    //   throw new AppError('There is already one product with this name', 400);
    // }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
