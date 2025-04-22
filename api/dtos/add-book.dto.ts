import { Type } from '@fastify/type-provider-typebox';

export const AddBookDtoSchema = Type.Object({
  isbn: Type.String(),
  title: Type.String(),
  author: Type.String(),
});

export type AddBookDto = typeof AddBookDtoSchema;
