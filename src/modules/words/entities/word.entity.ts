import { Prisma } from '@prisma/client';

export type WordEntity = Prisma.WordCreateInput & { wordId: number };
