import { Type } from '@fastify/type-provider-typebox';

export const BorrowBookDtoSchema = Type.Object({
  memberId: Type.String(),
  isbn: Type.String(),
  dueDate: Type.String({ format: 'date-time' }),
});

export type BorrowBookDto = typeof BorrowBookDtoSchema;
