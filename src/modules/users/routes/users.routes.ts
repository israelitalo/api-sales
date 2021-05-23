import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import AuthMiddlewareAuthentication from '@shared/http/middlewares/AuthMiddlewareAuthentication';

const usersRouter = Router();

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.get('/', AuthMiddlewareAuthentication, usersController.index);

usersRouter.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
    },
    { abortEarly: false },
  ),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  AuthMiddlewareAuthentication,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
