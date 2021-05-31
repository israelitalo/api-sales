import { Router } from 'express';
import CostumersController from '../controllers/CostumersController';
import { celebrate, Joi, Segments } from 'celebrate';
import AuthMiddlewareAuthentication from '@shared/http/middlewares/AuthMiddlewareAuthentication';

const costumersRouter = Router();

const costumersController = new CostumersController();

costumersRouter.use(AuthMiddlewareAuthentication);

costumersRouter.get('/', costumersController.index);

costumersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  costumersController.show,
);

costumersRouter.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
      },
    },
    { abortEarly: false },
  ),
  costumersController.create,
);

costumersRouter.put(
  '/:id',
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
      },
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    },
    { abortEarly: false },
  ),
  costumersController.update,
);

costumersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  costumersController.delete,
);

export default costumersRouter;
