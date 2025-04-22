import { Book } from "../../domain/book";
import { Loan, LoanId } from "../../domain/loan";

export interface LoanRepository {
    findById(loanId: LoanId): Promise<Loan | null>;
    findActiveLoanByBook(book: Book): Promise<Loan | null>;
    save(loan: Loan): Promise<void>;
}