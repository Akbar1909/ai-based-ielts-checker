import { Prisma } from '@prisma/client';

export type UserEntity = Prisma.UserCreateInput & { userId: number };

export enum UserRoleEnum {
  TEACHER = 'teacher',
  STUDENT = 'student',
}
