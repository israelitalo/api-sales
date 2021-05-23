import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import { celebrate, Joi, Segments } from 'celebrate';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();

const forgotController = new ForgotPasswordController();
const resetPassowrdController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate(
    {
      [Segments.BODY]: {
        email: Joi.string().email().required(),
      },
    },
    { abortEarly: false },
  ),
  forgotController.create,
);

passwordRouter.post(
  '/reset',
  celebrate(
    {
      [Segments.BODY]: {
        token: Joi.string().uuid().required(),
        password: Joi.string().required(),
        password_confirmation: Joi.string()
          .required()
          .valid(Joi.ref('password')),
      },
    },
    { abortEarly: false },
  ),
  resetPassowrdController.create,
);

export default passwordRouter;
