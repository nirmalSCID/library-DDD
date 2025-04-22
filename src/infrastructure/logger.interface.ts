export interface Logger {
    info(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
}
