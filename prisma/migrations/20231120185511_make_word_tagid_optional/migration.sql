-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_wordTagId_fkey";

-- AlterTable
ALTER TABLE "Word" ALTER COLUMN "wordTagId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_wordTagId_fkey" FOREIGN KEY ("wordTagId") REFERENCES "WordTag"("wordTagId") ON DELETE SET NULL ON UPDATE CASCADE;
