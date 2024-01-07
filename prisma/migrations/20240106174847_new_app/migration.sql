/*
  Warnings:

  - You are about to drop the column `mediaId` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the column `wordTagId` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the `WordTag` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[word,wordListId,example,description]` on the table `Word` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `updatedAt` on the `AssetLibrary` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `createdAt` on the `AssetLibrary` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `updatedAt` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `createdAt` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `createdAt` on the `Word` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `updatedAt` on the `Word` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_userId_fkey";

-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_wordTagId_fkey";

-- DropForeignKey
ALTER TABLE "WordTag" DROP CONSTRAINT "WordTag_userId_fkey";

-- DropIndex
DROP INDEX "Word_mediaId_key";

-- DropIndex
DROP INDEX "Word_word_wordTagId_userId_key";

-- AlterTable
ALTER TABLE "AssetLibrary" ADD COLUMN     "wordId" INTEGER,
DROP COLUMN "updatedAt",
ADD COLUMN     "updatedAt" INTEGER NOT NULL,
DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" VARCHAR(50) NOT NULL,
DROP COLUMN "updatedAt",
ADD COLUMN     "updatedAt" INTEGER NOT NULL,
DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Word" DROP COLUMN "mediaId",
DROP COLUMN "userId",
DROP COLUMN "wordTagId",
ADD COLUMN     "wordListId" INTEGER,
DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" INTEGER NOT NULL,
DROP COLUMN "updatedAt",
ADD COLUMN     "updatedAt" INTEGER NOT NULL;

-- DropTable
DROP TABLE "WordTag";

-- CreateTable
CREATE TABLE "WordList" (
    "wordListId" SERIAL NOT NULL,
    "userId" INTEGER,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '',
    "updatedAt" INTEGER NOT NULL,
    "createdAt" INTEGER NOT NULL,

    CONSTRAINT "WordList_pkey" PRIMARY KEY ("wordListId")
);

-- CreateIndex
CREATE UNIQUE INDEX "WordList_name_userId_key" ON "WordList"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Word_word_wordListId_example_description_key" ON "Word"("word", "wordListId", "example", "description");

-- AddForeignKey
ALTER TABLE "AssetLibrary" ADD CONSTRAINT "AssetLibrary_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("wordId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_wordListId_fkey" FOREIGN KEY ("wordListId") REFERENCES "WordList"("wordListId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordList" ADD CONSTRAINT "WordList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
