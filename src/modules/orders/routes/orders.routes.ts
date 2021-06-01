import { Router } from 'express';
import OrdersController from '../controllers/OrdersController';
import { celebrate, Joi, Segments } from 'celebrate';
import AuthMiddlewareAuthentication from '@shared/http/middlewares/AuthMiddlewareAuthentication';

const ordersRouter = Router();

const ordersController = new OrdersController();

ordersRouter.use(AuthMiddlewareAuthentication);

ordersRouter.get(
  '/:id',
  AuthMiddlewareAuthentication,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ordersController.show,
);
ordersRouter.post(
  '/',
  AuthMiddlewareAuthentication,
  celebrate(
    {
      [Segments.BODY]: {
        customer_id: Joi.string().uuid().required(),
        products: Joi.array().required(),
      },
    },
    { abortEarly: false },
  ),
  ordersController.create,
);

export default ordersRouter;
