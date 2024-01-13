/*
  Warnings:

  - You are about to drop the column `wordId` on the `AssetLibrary` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AssetLibrary" DROP CONSTRAINT "AssetLibrary_wordId_fkey";

-- AlterTable
ALTER TABLE "AssetLibrary" DROP COLUMN "wordId",
ADD COLUMN     "exampleId" INTEGER;

-- CreateTable
CREATE TABLE "Definition" (
    "definitionId" SERIAL NOT NULL,
    "wordId" INTEGER NOT NULL,
    "definition" TEXT NOT NULL,
    "partOfSpeech" TEXT,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER NOT NULL,

    CONSTRAINT "Definition_pkey" PRIMARY KEY ("definitionId")
);

-- CreateTable
CREATE TABLE "Example" (
    "exampleId" SERIAL NOT NULL,
    "example" TEXT NOT NULL,
    "definitionId" INTEGER NOT NULL,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("exampleId")
);

-- AddForeignKey
ALTER TABLE "AssetLibrary" ADD CONSTRAINT "AssetLibrary_exampleId_fkey" FOREIGN KEY ("exampleId") REFERENCES "Example"("exampleId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Definition" ADD CONSTRAINT "Definition_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("wordId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Example" ADD CONSTRAINT "Example_definitionId_fkey" FOREIGN KEY ("definitionId") REFERENCES "Definition"("definitionId") ON DELETE RESTRICT ON UPDATE CASCADE;
