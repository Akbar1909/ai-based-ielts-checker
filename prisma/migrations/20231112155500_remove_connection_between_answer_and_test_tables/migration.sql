/*
  Warnings:

  - You are about to drop the column `testId` on the `Answer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_testId_fkey";

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "testId";

-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "answers" TEXT[];
