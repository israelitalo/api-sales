import { Request, Response } from 'express';
import ResetPasswordService from '../services/ResetPasswordService';

class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const resetPasswordService = new ResetPasswordService();

    await resetPasswordService.execute({ token, password });

    return response.status(204).json();
  }
}

export default ResetPasswordController;
