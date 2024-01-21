/*
  Warnings:

  - You are about to drop the column `wordListId` on the `Word` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_wordListId_fkey";

-- AlterTable
ALTER TABLE "Word" DROP COLUMN "wordListId";

-- CreateTable
CREATE TABLE "_DefinitionToWordList" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DefinitionToWordList_AB_unique" ON "_DefinitionToWordList"("A", "B");

-- CreateIndex
CREATE INDEX "_DefinitionToWordList_B_index" ON "_DefinitionToWordList"("B");

-- AddForeignKey
ALTER TABLE "_DefinitionToWordList" ADD CONSTRAINT "_DefinitionToWordList_A_fkey" FOREIGN KEY ("A") REFERENCES "Definition"("definitionId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DefinitionToWordList" ADD CONSTRAINT "_DefinitionToWordList_B_fkey" FOREIGN KEY ("B") REFERENCES "WordList"("wordListId") ON DELETE CASCADE ON UPDATE CASCADE;
