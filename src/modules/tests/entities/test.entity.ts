import { Prisma } from '@prisma/client';

export type TestEntity = Prisma.TestCreateInput & { testId: number };
