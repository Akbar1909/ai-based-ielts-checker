import { Prisma } from '@prisma/client';

export type WordTagEntity = Prisma.WordTagCreateInput & { wordTagId: number };
