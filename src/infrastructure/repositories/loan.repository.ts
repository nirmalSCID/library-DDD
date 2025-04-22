import { Loan, LoanId } from '../../domain/loan';
import { Book } from '../../domain/book';
import { LoanRepository } from '../../application/ports/loan.repository.port';
import { Database } from '../database.interface';
import { Logger } from '../logger.interface';
import { injectable, inject } from 'tsyringe';

@injectable()
export class InMemoryLoanRepository implements LoanRepository {
  constructor(
    @inject('Database') private readonly database: Database,
    @inject('Logger') private readonly logger: Logger
  ) {}

  async findById(loanId: LoanId): Promise<Loan | null> {
    this.logger.info(`Fetching loan with ID ${loanId.value}.`);
    return this.database.getLoanById(loanId.value);
  }

  async findActiveLoanByBook(book: Book): Promise<Loan | null> {
    this.logger.info(`Finding active loan for book with ISBN ${book.isbn.value}.`);
    return this.database.findActiveLoanByBook(book);
  }

  async save(loan: Loan): Promise<void> {
    await this.database.saveLoan(loan);
    this.logger.info(`Loan with ID ${loan.loanId.value} saved.`);
  }
}
