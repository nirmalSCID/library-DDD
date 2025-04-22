export class BookNotFoundError extends Error {
    constructor(isbn: string) {
        super(`Book with ISBN ${isbn} not found.`);
        this.name = 'BookNotFoundError';
    }
}

export class MemberNotFoundError extends Error {
    constructor(memberId: string) {
        super(`Member with ID ${memberId} not found.`);
        this.name = 'MemberNotFoundError';
    }
}

export class ActiveLoanNotFoundError extends Error {
    constructor(isbn: string) {
        super(`No active loan found for book with ISBN ${isbn}.`);
        this.name = 'ActiveLoanNotFoundError';
    }
}