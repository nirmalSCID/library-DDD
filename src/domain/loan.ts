import { Book } from "./book";
import { Member } from "./member";

export class LoanId {
    constructor(readonly value: string) {}
}

export class Loan {
    constructor(
        readonly loanId: LoanId,
        readonly book: Book,
        readonly member: Member,
        readonly borrowDate: Date,
        readonly dueDate: Date
    ) {}

    static create(book: Book, member: Member, dueDate: Date): Loan {
        if (!book.isAvailable) {
            throw new Error(`Book with ISBN ${book.isbn.value} is not available for borrowing.`);
        }
        book.borrow();
        return new Loan (
            new LoanId(crypto.randomUUID()),
            book,
            member,
            new Date(),
            dueDate
        );
    }

    markAsReturned(): void {
        this.book.return();
    }
}