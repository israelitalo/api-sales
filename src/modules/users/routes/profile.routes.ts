import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import AuthMiddlewareAuthentication from '@shared/http/middlewares/AuthMiddlewareAuthentication';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.use(AuthMiddlewareAuthentication);

profileRouter.get('/', profileController.show);

profileRouter.put(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().optional(),
        old_password: Joi.string(),
        password_confirmation: Joi.string()
          .valid(Joi.ref('password'))
          .when('password', {
            is: Joi.exist(),
            then: Joi.required(),
          }),
      },
    },
    { abortEarly: false },
  ),
  profileController.update,
);

export default profileRouter;
