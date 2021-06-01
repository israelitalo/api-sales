import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import { classToClass } from 'class-transformer';

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const updateAvatarService = new UpdateUserAvatarService();

    const user = await updateAvatarService.execute({
      user_id: id,
      avatarFileName: request.file.filename,
    });

    return response.status(200).json(classToClass(user));
  }
}

export default UserAvatarController;
