/*
  Warnings:

  - You are about to drop the column `testId` on the `TestTag` table. All the data in the column will be lost.
  - You are about to drop the `Answer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TestTag" DROP CONSTRAINT "TestTag_testId_fkey";

-- AlterTable
ALTER TABLE "TestTag" DROP COLUMN "testId";

-- DropTable
DROP TABLE "Answer";

-- CreateTable
CREATE TABLE "_TestToTestTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TestToTestTag_AB_unique" ON "_TestToTestTag"("A", "B");

-- CreateIndex
CREATE INDEX "_TestToTestTag_B_index" ON "_TestToTestTag"("B");

-- AddForeignKey
ALTER TABLE "_TestToTestTag" ADD CONSTRAINT "_TestToTestTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Test"("testId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TestToTestTag" ADD CONSTRAINT "_TestToTestTag_B_fkey" FOREIGN KEY ("B") REFERENCES "TestTag"("testTagId") ON DELETE CASCADE ON UPDATE CASCADE;
