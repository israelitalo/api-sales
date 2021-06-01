import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';
import { classToClass } from 'class-transformer';

class SessionsContoller {
  public async index(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSessionsService = new CreateSessionsService();

    const user = await createSessionsService.execute({ email, password });

    return response.status(200).json(classToClass(user));
  }
}

export default SessionsContoller;
