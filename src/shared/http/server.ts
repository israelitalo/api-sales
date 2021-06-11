import 'reflect-metadata';
import 'dotenv/config';
import uploadConfig from '@config/upload';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination';
import rateLimiter from '@shared/http/middlewares/rateLimiter';

const app = express();

app.use(cors());
app.use(express.json());

app.use(rateLimiter);

app.use(pagination);

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    } else {
      return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  },
);

app.listen(process.env.APP_PORT || 3001, () => {
  console.log('api-vendas run in port 3333!');
});
