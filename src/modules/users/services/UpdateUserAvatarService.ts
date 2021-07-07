import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    let fileName;

    if (uploadConfig.driver === 's3') {
      const storageProviderS3 = new S3StorageProvider();
      if (user.avatar) {
        await storageProviderS3.deleteFile(user.avatar);
      }

      fileName = await storageProviderS3.saveFile(avatarFileName);
    } else {
      const storageProvider = new DiskStorageProvider();

      if (user.avatar) {
        await storageProvider.deleteFile(user.avatar);
      }

      fileName = await storageProvider.saveFile(avatarFileName);
    }

    user.avatar = fileName;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
