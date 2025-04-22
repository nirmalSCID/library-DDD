import { Book } from '../domain/book';
import { Member } from '../domain/member';
import { Loan } from '../domain/loan';

export interface Database {
  getBookByISBN(isbn: string): Promise<Book | null>;
  saveBook(book: Book): Promise<void>;
  getMemberById(memberId: string): Promise<Member | null>;
  saveMember(member: Member): Promise<void>;
  getLoanById(loanId: string): Promise<Loan | null>;
  findActiveLoanByBook(book: Book): Promise<Loan | null>;
  saveLoan(loan: Loan): Promise<void>;
}
