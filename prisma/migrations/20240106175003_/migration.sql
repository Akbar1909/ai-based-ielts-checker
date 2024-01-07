/*
  Warnings:

  - You are about to drop the column `description` on the `Word` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[word,wordListId,example,definition]` on the table `Word` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `definition` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Word_word_wordListId_example_description_key";

-- AlterTable
ALTER TABLE "Word" DROP COLUMN "description",
ADD COLUMN     "definition" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Word_word_wordListId_example_definition_key" ON "Word"("word", "wordListId", "example", "definition");
