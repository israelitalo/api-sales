import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';
import AuthMiddlewareAuthentication from '@shared/http/middlewares/AuthMiddlewareAuthentication';

const productsRouter = Router();

const productsController = new ProductsController();

productsRouter.get('/', AuthMiddlewareAuthentication, productsController.index);

productsRouter.get(
  '/:id',
  AuthMiddlewareAuthentication,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.show,
);

productsRouter.post(
  '/',
  AuthMiddlewareAuthentication,
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        quantity: Joi.number().required(),
      },
    },
    { abortEarly: false },
  ),
  productsController.create,
);

productsRouter.put(
  '/:id',
  AuthMiddlewareAuthentication,
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        quantity: Joi.number().required(),
      },
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    },
    { abortEarly: false },
  ),
  productsController.update,
);

productsRouter.delete(
  '/:id',
  AuthMiddlewareAuthentication,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.delete,
);

export default productsRouter;
