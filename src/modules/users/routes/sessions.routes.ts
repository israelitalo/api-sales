import { Router } from 'express';
import SessionsContoller from '../controllers/SessionsContoller';
import { celebrate, Joi, Segments } from 'celebrate';

const sessionsRouter = Router();

const sessionsController = new SessionsContoller();

sessionsRouter.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
    },
    { abortEarly: false },
  ),
  sessionsController.index,
);

export default sessionsRouter;
