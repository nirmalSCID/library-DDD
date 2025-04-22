import { inject, injectable } from 'tsyringe';
import { BookRepository } from '../ports/book.repository.port';
import { LoanRepository } from '../ports/loan.repository.port';
import { Logger } from '../../infrastructure/logger.interface';
import { ISBN } from '../../domain/book';
import { ActiveLoanNotFoundError, BookNotFoundError } from '../../domain/errors';

export interface ReturnBookCommand {
    isbn: string;
}

@injectable()
export class ReturnBookUseCase {
    constructor(
        @inject('BookRepository') private readonly bookRepository: BookRepository,
        @inject('LoanRepository') private readonly loanRepository: LoanRepository,
        @inject('Logger') private readonly logger: Logger
    ) { }

    async execute(command: ReturnBookCommand): Promise<void> {
        this.logger.info(`Executing ReturnBookUseCase for ISBN ${command.isbn}.`);
        const book = await this.bookRepository.findByISBN(new ISBN(command.isbn));
        if (!book) {
            throw new BookNotFoundError(command.isbn);
        }

        const activeLoan = await this.loanRepository.findActiveLoanByBook(book);
        if (!activeLoan) {
            throw new ActiveLoanNotFoundError(command.isbn);
        }

        activeLoan.markAsReturned();
        await this.loanRepository.save(activeLoan);
        await this.bookRepository.save(book);
        this.logger.info(`ReturnBookUseCase executed successfully.`);
    }
} 
