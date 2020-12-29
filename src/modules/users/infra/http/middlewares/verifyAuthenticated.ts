import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import ApiError from '@shared/errors/ApiError';

interface ITokenPayload {
  iat: number;
  ext: number;
  sub: string;
}

export default function verifyAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new ApiError('Missing JWT Token', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, process.env.SECRET_AUTH_KEY);

    const { sub } = decoded as ITokenPayload;
    request.user = {
      id: sub,
    };
    return next();
  } catch {
    throw new ApiError('Invalid JWT token', 500);
  }
}
