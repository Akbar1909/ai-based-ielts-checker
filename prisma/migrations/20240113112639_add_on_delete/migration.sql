-- DropForeignKey
ALTER TABLE "Definition" DROP CONSTRAINT "Definition_wordId_fkey";

-- DropForeignKey
ALTER TABLE "Example" DROP CONSTRAINT "Example_definitionId_fkey";

-- AddForeignKey
ALTER TABLE "Definition" ADD CONSTRAINT "Definition_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("wordId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Example" ADD CONSTRAINT "Example_definitionId_fkey" FOREIGN KEY ("definitionId") REFERENCES "Definition"("definitionId") ON DELETE CASCADE ON UPDATE CASCADE;
