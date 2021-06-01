import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';
import { classToClass } from 'class-transformer';

class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = new ShowProfileService();

    const user_id = request.user.id;

    const user = await showProfile.execute({ user_id });

    return response.status(200).json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, password, old_password } = request.body;

    const updateUser = new UpdateProfileService();

    const user = await updateUser.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return response.status(200).json(classToClass(user));
  }
}

export default ProfileController;
