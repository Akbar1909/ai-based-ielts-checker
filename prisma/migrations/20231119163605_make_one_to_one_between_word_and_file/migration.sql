/*
  Warnings:

  - You are about to drop the column `photoUrl` on the `Word` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[wordId]` on the table `AssetLibrary` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "AssetLibrary" ADD COLUMN     "wordId" INTEGER;

-- AlterTable
ALTER TABLE "Word" DROP COLUMN "photoUrl";

-- CreateIndex
CREATE UNIQUE INDEX "AssetLibrary_wordId_key" ON "AssetLibrary"("wordId");

-- AddForeignKey
ALTER TABLE "AssetLibrary" ADD CONSTRAINT "AssetLibrary_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("wordId") ON DELETE SET NULL ON UPDATE CASCADE;
