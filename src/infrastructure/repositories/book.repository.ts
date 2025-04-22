import { Book, ISBN } from '../../domain/book';
import { BookRepository } from '../../application/ports/book.repository.port';
import { Database } from '../database.interface';
import { Logger } from '../logger.interface';
import { Cache } from '../cache.interface';
import { injectable, inject } from 'tsyringe';

@injectable()
export class InMemoryBookRepository implements BookRepository {
  constructor(
    @inject('Database') private readonly database: Database,
    @inject('Logger') private readonly logger: Logger,
    @inject('Cache') private readonly cache: Cache
  ) {}

  async findByISBN(isbn: ISBN): Promise<Book | null> {
    const cachedBook = await this.cache.get<Book>(`book:${isbn.value}`);
    if (cachedBook) {
      this.logger.info(`Book with ISBN ${isbn.value} retrieved from cache.`);
      return cachedBook;
    }

    const book = await this.database.getBookByISBN(isbn.value);
    if (book) {
      await this.cache.set(`book:${isbn.value}`, book, 60);
      this.logger.info(`Book with ISBN ${isbn.value} retrieved from database and cached.`);
    } else {
      this.logger.info(`Book with ISBN ${isbn.value} not found.`);
    }
    return book;
  }

  async save(book: Book): Promise<void> {
    await this.database.saveBook(book);
    await this.cache.delete(`book:${book.isbn.value}`);
    this.logger.info(`Book with ISBN ${book.isbn.value} saved.`);
  }
}