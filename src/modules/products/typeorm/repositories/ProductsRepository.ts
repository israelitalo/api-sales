import { EntityRepository, Repository, In } from 'typeorm';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);

    const existsProducts = await this.find({
      where: {
        id: In(productIds),
      },
    });

    return existsProducts;
  }
}
