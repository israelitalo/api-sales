import { Request, Response } from 'express';
import CreateCustomerService from '../services/CreateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';
import ListCustomerService from '../services/ListCustomerService';
import ShowCostumerService from '../services/ShowCostumerService';
import UpdateCustomerService from '../services/UpdateCustomerService';

class CostumersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomerService = new ListCustomerService();

    const customers = await listCustomerService.execute();

    return response.json(customers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCostumerService = new ShowCostumerService();

    const costumer = await showCostumerService.execute({ id });

    return response.json(costumer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createCustomerService = new CreateCustomerService();

    const costumer = await createCustomerService.execute({ name, email });

    return response.json(costumer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email } = request.body;

    const updateCustomerService = new UpdateCustomerService();

    const costumer = await updateCustomerService.execute({
      id,
      name,
      email,
    });

    return response.json(costumer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomerService = new DeleteCustomerService();

    await deleteCustomerService.execute({ id });

    return response.json({ message: 'Costumer deleted' });
  }
}

export default CostumersController;
