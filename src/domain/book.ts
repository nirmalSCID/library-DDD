export class ISBN {
    constructor(readonly value: string) {}
}


export class Book {
    constructor(
        readonly isbn: ISBN,
        readonly title: string,
        readonly author: string,
        public isAvailable: boolean = true
    ) {}

    borrow(): void {
        if (!this.isAvailable) {
            throw new Error(`Book with ISBN ${this.isbn.value} is already borrowed.`);
        }
        this.isAvailable = false;
    }

    return(): void {
        this.isAvailable = true;
    }
}