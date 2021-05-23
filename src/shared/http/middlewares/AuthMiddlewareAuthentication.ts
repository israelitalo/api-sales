import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface ITokenPayload {
  iat: number;
  exp: number;
  id: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodeToken = verify(token, authConfig.jwt.secret);

    const { id } = decodeToken as ITokenPayload;

    request.user = {
      id,
    };

    return next();
  } catch (error) {
    throw new AppError(error.message);
  }
}
