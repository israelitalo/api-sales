import { EntityRepository, Repository } from 'typeorm';
import Product from '../entities/Product';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {}
