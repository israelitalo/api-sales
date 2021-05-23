import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';

class SessionsContoller {
  public async index(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSessionsService = new CreateSessionsService();

    const user = await createSessionsService.execute({ email, password });

    return response.status(200).json(user);
  }
}

export default SessionsContoller;
