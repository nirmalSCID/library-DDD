import { Book, ISBN } from "../../domain/book";

export interface BookRepository {
    findByISBN(isbn: ISBN): Promise<Book | null>;
    save(book: Book): Promise<void>;
}
