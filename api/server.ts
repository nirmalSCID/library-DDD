import 'reflect-metadata';
import Fastify, { FastifyPluginAsync } from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { LibraryController } from './controllers/library.controller';
import { container } from 'tsyringe';
import { Database } from '@src/infrastructure/database.interface';
import { InMemoryDatabase } from '@src/infrastructure/in-memory-database';
import { Logger } from '@src/infrastructure/logger.interface';
import { InMemoryLogger } from '@src/infrastructure/in-memory-logger';
import { Cache } from '@src/infrastructure/cache.interface';
import { InMemoryCache } from '@src/infrastructure/in-memory-cache';
import { BookRepository } from '@src/application/ports/book.repository.port';
import { InMemoryBookRepository } from '@src/infrastructure/repositories/book.repository';
import { MemberRepository } from '@src/application/ports/member.repository.port';
import { InMemoryMemberRepository } from '@src/infrastructure/repositories/member.repository';
import { LoanRepository } from '@src/application/ports/loan.repository.port';
import { InMemoryLoanRepository } from '@src/infrastructure/repositories/loan.repository';
import { BorrowBookDtoSchema } from './dtos/borrow-book.dto';
import { ReturnBookDtoSchema } from './dtos/return-book.dto';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyPlugin from 'fastify-plugin';
import { AddBookDtoSchema } from './dtos/add-book.dto';

// Register dependencies
container.register<Database>('Database', { useClass: InMemoryDatabase });
container.register<Logger>('Logger', { useClass: InMemoryLogger });
container.register<Cache>('Cache', { useClass: InMemoryCache });
container.register<BookRepository>('BookRepository', { useClass: InMemoryBookRepository });
container.register<MemberRepository>('MemberRepository', { useClass: InMemoryMemberRepository });
container.register<LoanRepository>('LoanRepository', { useClass: InMemoryLoanRepository });

const libraryPlugin: FastifyPluginAsync = async (fastify) => {
  const libraryController = new LibraryController();

  fastify.post(
    '/books/borrow',
    { schema: { body: BorrowBookDtoSchema } },
    libraryController.borrowBook.bind(libraryController)
  );

  fastify.post(
    '/books/return',
    { schema: { body: ReturnBookDtoSchema } },
    libraryController.returnBook.bind(libraryController)
  );

  fastify.post(
    '/books',
    { schema: { body: AddBookDtoSchema } },
    libraryController.addBook.bind(libraryController)
  );
};

async function createServer() {
  const server = Fastify({ logger: true }).withTypeProvider<TypeBoxTypeProvider>();

  await server.register(fastifyPlugin(libraryPlugin));

  // Register Swagger
  await server.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'Library Lending API',
        description: 'API for managing book lending',
        version: '1.0.0',
      },
    },
  });

  // Register Swagger UI
  await server.register(fastifySwaggerUi, {
    routePrefix: '/documentation',
  });

  return server;
}

async function startServer() {
  const server = await createServer();
  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server listening on http://localhost:3000');
    console.log('Swagger UI available on http://localhost:3000/documentation');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

startServer();