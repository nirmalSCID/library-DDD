import { Database } from './database.interface';
import { Book } from '../domain/book';
import { Member } from '../domain/member';
import { Loan } from '../domain/loan';
import { injectable } from 'tsyringe';

@injectable()
export class InMemoryDatabase implements Database {
  private readonly books: Map<string, Book> = new Map();
  private readonly members: Map<string, Member> = new Map();
  private readonly loans: Map<string, Loan> = new Map();

  async getBookByISBN(isbn: string): Promise<Book | null> {
    return this.books.get(isbn) || null;
  }
  async saveBook(book: Book): Promise<void> {
    this.books.set(book.isbn.value, book);
  }
  async getMemberById(memberId: string): Promise<Member | null> {
    return this.members.get(memberId) || null;
  }
  async saveMember(member: Member): Promise<void> {
    this.members.set(member.memberId.value, member);
  }
  async getLoanById(loanId: string): Promise<Loan | null> {
    return this.loans.get(loanId) || null;
  }
  async findActiveLoanByBook(book: Book): Promise<Loan | null> {
    for (const loan of this.loans.values()) {
      if (loan.book.isbn.value === book.isbn.value && loan.book.isAvailable === false) {
        return loan;
      }
    }
    return null;
  }
  async saveLoan(loan: Loan): Promise<void> {
    this.loans.set(loan.loanId.value, loan);
  }
}
