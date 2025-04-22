import { Logger } from './logger.interface';
import { injectable } from 'tsyringe';

@injectable()
export class InMemoryLogger implements Logger {
  info(message: string, ...args: any[]): void {
    console.log(`[INFO] ${message}`, ...args);
  }
  error(message: string, ...args: any[]): void {
    console.error(`[ERROR] ${message}`, ...args);
  }
}
