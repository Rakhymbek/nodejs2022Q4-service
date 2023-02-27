import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class LoggingService implements LoggerService {
  private readonly logger: any;

  constructor() {
    this.logger = console;
  }

  log(message: string) {
    this.logger.log(`[INFO] ${message}`);
  }

  error(message: string, trace: string) {
    this.logger.error(`[ERROR] ${message} ${trace}`);
  }

  warn(message: string) {
    this.logger.warn(`[WARN] ${message}`);
  }

  debug(message: string) {
    this.logger.debug(`[DEBUG] ${message}`);
  }

  verbose(message: string) {
    this.logger.verbose(`[VERBOSE] ${message}`);
  }
}
