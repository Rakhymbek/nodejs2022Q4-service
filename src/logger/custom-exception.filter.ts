import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggingService } from './logger.service';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggingService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.getResponse() as string;
      this.logger.warn(
        `[${status}] ${request.method} ${request.url} - ${message}`,
      );
      response.status(status).json({
        statusCode: status,
        message,
      });
    } else {
      this.logger.error(
        `[500] ${request.method} ${request.url}`,
        exception.stack,
      );
      response.status(500).json({
        statusCode: 500,
        message: 'Internal Server Error',
      });
    }
  }
}
