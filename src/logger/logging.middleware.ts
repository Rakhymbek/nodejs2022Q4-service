import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logger.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, query, body } = req;
    this.logger.log(
      `Incoming request: ${method} ${url} ${JSON.stringify(
        query,
      )} ${JSON.stringify(body)}`,
    );
    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.log(`Outgoing response: ${statusCode}`);
    });
    next();
  }
}
