/*
  Warnings:

  - You are about to drop the column `definition` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the column `example` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the column `partOfSpeech` on the `Word` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[word]` on the table `Word` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Word_word_example_definition_key";

-- AlterTable
ALTER TABLE "Word" DROP COLUMN "definition",
DROP COLUMN "example",
DROP COLUMN "partOfSpeech";

-- CreateIndex
CREATE UNIQUE INDEX "Word_word_key" ON "Word"("word");
