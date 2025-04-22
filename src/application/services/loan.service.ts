import { inject, injectable } from 'tsyringe';
import { LoanRepository } from '../ports/loan.repository.port';
import { Logger } from '../../infrastructure/logger.interface';
import { Book } from '../../domain/book';
import { Member } from '../../domain/member';
import { Loan } from '../../domain/loan';


@injectable()
export class LoanService {
    constructor(
        @inject('LoanRepository') private readonly loanRepository: LoanRepository,
        @inject('Logger') private readonly logger: Logger,
    ) { }

    async borrowBook(book: Book, member: Member, dueDate: Date): Promise<Loan> {
        this.logger.info(`Borrowing book ${book.isbn.value} by member ${member.memberId.value}.`);
        const loan = Loan.create(book, member, dueDate);
        await this.loanRepository.save(loan);
        this.logger.info(`Loan created with ID ${loan.loanId.value}.`);
        return loan;
    }
}
