import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JWT } from 'src/config/jwt';
import { PostgresClient } from 'src/database/postgres/postgres.service';
import { UserRoles, UserStatus } from 'src/interfaces/general.interfaces';

@Injectable()
export class Middleware implements NestMiddleware {
  constructor(private readonly db: PostgresClient) {}

  private jwtToken = new JWT();
  private HAS_USER_IN_BASE =
    'SELECT user_id, user_status, user_role FROM users WHERE user_id = $1 AND deleted is null';

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      let token = req.headers?.authorization;
      if (!token)
        return res.status(401).json({ message: 'Unauthorized', code: 401 });

      const data = this.jwtToken.verify(token);
      const user = await this.db.fetch<{
        user_id: string;
        user_status: UserStatus;
        user_role: UserRoles;
      }>(this.HAS_USER_IN_BASE, data?.user_id);

      if (!user?.user_id) {
        return res.status(401).json({ message: 'Unauthorized', code: 401 });
      }

      req['user'] = user;

      next();
    } catch (error) {
      if (error.message === 'invalid token')
        return res.status(401).json({ message: 'Unauthorized', code: 401 });
      else if (error.message === 'jwt expired')
        return res.status(400).json({ message: 'Jwt expired', code: 400 });
      else next(error);
    }
  }
}
