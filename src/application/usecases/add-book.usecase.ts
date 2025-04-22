import { inject, injectable } from 'tsyringe';
import { BookRepository } from '../ports/book.repository.port';
import { ISBN, Book } from '../../domain/book';
import { Logger } from '../../infrastructure/logger.interface';

export interface AddBookCommand {
  isbn: string;
  title: string;
  author: string;
}

@injectable()
export class AddBookUseCase {
  constructor(
    @inject('BookRepository') private readonly bookRepository: BookRepository,
    @inject('Logger') private readonly logger: Logger
  ) {}

  async execute(command: AddBookCommand): Promise<void> {
    this.logger.info(`Executing AddBookUseCase for ISBN ${command.isbn}.`);
    const isbn = new ISBN(command.isbn); // Create ISBN value object
    const newBook = new Book(isbn, command.title, command.author);
    await this.bookRepository.save(newBook);
    this.logger.info(`Book with ISBN ${command.isbn} added successfully.`);
  }
}
