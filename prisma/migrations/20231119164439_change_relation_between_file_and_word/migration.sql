/*
  Warnings:

  - You are about to drop the column `wordId` on the `AssetLibrary` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mediaId]` on the table `Word` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "AssetLibrary" DROP CONSTRAINT "AssetLibrary_wordId_fkey";

-- DropIndex
DROP INDEX "AssetLibrary_wordId_key";

-- AlterTable
ALTER TABLE "AssetLibrary" DROP COLUMN "wordId";

-- AlterTable
ALTER TABLE "Word" ADD COLUMN     "mediaId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Word_mediaId_key" ON "Word"("mediaId");

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "AssetLibrary"("mediaId") ON DELETE SET NULL ON UPDATE CASCADE;
