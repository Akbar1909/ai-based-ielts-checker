/*
  Warnings:

  - Added the required column `photoUrl` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Word" ADD COLUMN     "photoUrl" TEXT NOT NULL;
