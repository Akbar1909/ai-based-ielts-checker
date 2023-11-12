/*
  Warnings:

  - Added the required column `filePath` to the `AssetLibrary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AssetLibrary" ADD COLUMN     "filePath" TEXT NOT NULL;
