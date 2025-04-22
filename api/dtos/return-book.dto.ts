import { Type } from '@fastify/type-provider-typebox';

export const ReturnBookDtoSchema = Type.Object({
  isbn: Type.String(),
});

export type ReturnBookDto = typeof ReturnBookDtoSchema;
