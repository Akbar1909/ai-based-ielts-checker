/*
  Warnings:

  - A unique constraint covering the columns `[word,wordTagId,userId]` on the table `Word` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tag,userId]` on the table `WordTag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Word_word_wordTagId_userId_key" ON "Word"("word", "wordTagId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "WordTag_tag_userId_key" ON "WordTag"("tag", "userId");
