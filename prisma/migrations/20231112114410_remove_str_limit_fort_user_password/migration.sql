/*
  Warnings:

  - Added the required column `authorId` to the `TestTag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestTag" ADD COLUMN     "authorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "TestTag" ADD CONSTRAINT "TestTag_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
