import { inject, injectable  } from 'tsyringe';
import { BookRepository } from '../ports/book.repository.port';
import { MemberRepository } from '../ports/member.repository.port';
import { Logger } from '../../infrastructure/logger.interface';
import { ISBN } from '../../domain/book';
import { BookNotFoundError, MemberNotFoundError } from '../../domain/errors';
import { MemberId } from '../../domain/member';
import { LoanService } from '../services/loan.service';

export interface BorrowBookCommand {
    memberId: string;
    isbn: string;
    dueDate: Date;
}


@injectable()
export class BorrowBookUseCase {
    constructor(
        @inject('BookRepository') private readonly bookRepository: BookRepository,
        @inject('MemberRepository') private readonly memberRepository: MemberRepository,
        private readonly loanService: LoanService,
        @inject('Logger') private readonly logger: Logger
    ) {}

    async execute(command: BorrowBookCommand): Promise<void> {
        this.logger.info(`Executing BorrowBookUseCase for member ${command.memberId}, ISBN ${command.isbn}.`);
        const book = await this.bookRepository.findByISBN(new ISBN(command.isbn));
        if (!book) {
            throw new BookNotFoundError(command.isbn);
        }

        const member = await this.memberRepository.findById(new MemberId(command.memberId));
        if (!member) {
            throw new MemberNotFoundError(command.memberId);
        }

        await this.loanService.borrowBook(book, member, command.dueDate);
        this.logger.info(`BorrowBookUseCase executed successfully.`);
    }
}