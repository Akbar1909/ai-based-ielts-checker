/*
  Warnings:

  - A unique constraint covering the columns `[word,example,definition]` on the table `Word` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Word_word_wordListId_example_definition_key";

-- CreateIndex
CREATE UNIQUE INDEX "Word_word_example_definition_key" ON "Word"("word", "example", "definition");
