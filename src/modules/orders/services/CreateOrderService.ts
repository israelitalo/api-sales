import { CustomersRepository } from '@modules/customers/typeorm/repositories/CustomersRepository';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customerRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductRepository);

    const customerExists = await customerRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any costumer with the given id', 400);
    }

    const productExists = await productsRepository.findAllByIds(products);

    if (!productExists.length) {
      throw new AppError('Could not find any products with the given ids', 400);
    }

    const productExistsIds = productExists.map(product => product.id);

    const checkInexistentsProducts = products.filter(
      product => !productExistsIds.includes(product.id),
    );

    if (checkInexistentsProducts.length) {
      throw new AppError(
        `Could not find ${checkInexistentsProducts[0].id}`,
        400,
      );
    }

    const quantityAvailable = products.filter(
      product =>
        productExists.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`,
        400,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: productExists.filter(prod => prod.id === product.id)[0].price,
    }));

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        productExists.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await productsRepository.save(updatedProductQuantity);

    return order;
  }
}

export default CreateOrderService;
