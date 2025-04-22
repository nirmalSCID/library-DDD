import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import {
  BorrowBookUseCase,
  BorrowBookCommand,
} from '@src/application/usecases/borrow-book.usecase';
import {
  ReturnBookUseCase,
  ReturnBookCommand,
} from '@src/application/usecases/return-book.usecase';
import { BorrowBookDto } from '../dtos/borrow-book.dto';
import { ReturnBookDto } from '../dtos/return-book.dto';
import { AddBookDto } from 'api/dtos/add-book.dto';
import { BookNotFoundError, MemberNotFoundError, ActiveLoanNotFoundError } from '@src/domain/errors';
import { AddBookCommand, AddBookUseCase } from '@src/application/usecases/add-book.usecase';

export class LibraryController {
  async borrowBook(request: FastifyRequest<{ Body: BorrowBookDto }>, reply: FastifyReply) {
    const { memberId, isbn, dueDate } = request.body;
    const command: BorrowBookCommand = { memberId, isbn, dueDate: new Date(dueDate) };
    const borrowBookUseCase = container.resolve(BorrowBookUseCase);
    try {
      await borrowBookUseCase.execute(command);
      reply.status(202).send({ message: 'Book borrowed successfully.' });
    } catch (error: any) {
      if (error instanceof BookNotFoundError) {
        reply.status(404).send({ error: error.message });
      } else if (error instanceof MemberNotFoundError) {
        reply.status(404).send({ error: error.message });
      } else {
        reply.status(400).send({ error: error.message });
      }
    }
  }

  async returnBook(request: FastifyRequest<{ Body: ReturnBookDto }>, reply: FastifyReply) {
    const { isbn } = request.body;
    const command: ReturnBookCommand = { isbn };
    const returnBookUseCase = container.resolve(ReturnBookUseCase);
    try {
      await returnBookUseCase.execute(command);
      reply.status(200).send({ message: 'Book returned successfully.' });
    } catch (error: any) {
      if (error instanceof BookNotFoundError) {
        reply.status(404).send({ error: error.message });
      } else if (error instanceof ActiveLoanNotFoundError) {
        reply.status(404).send({ error: error.message });
      } else {
        reply.status(400).send({ error: error.message });
      }
    }
  }

  async addBook(request: FastifyRequest<{ Body: AddBookDto }>, reply: FastifyReply) {
    const { isbn, title = '', author } = request.body;
    const command: AddBookCommand = { isbn, title, author };
    const addBookUseCase = container.resolve(AddBookUseCase);
    try {
      await addBookUseCase.execute(command);
      reply.status(201).send({ message: 'Book added successfully.' });
    } catch (error: any) {
      reply.status(400).send({ error: error.message });
    }
  }
}
