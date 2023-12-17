/*
  Warnings:

  - You are about to drop the column `testId` on the `AssetLibrary` table. All the data in the column will be lost.
  - You are about to drop the `Attempt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TestToTestTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AssetLibrary" DROP CONSTRAINT "AssetLibrary_testId_fkey";

-- DropForeignKey
ALTER TABLE "Attempt" DROP CONSTRAINT "Attempt_testId_fkey";

-- DropForeignKey
ALTER TABLE "Attempt" DROP CONSTRAINT "Attempt_userId_fkey";

-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_testGroupId_fkey";

-- DropForeignKey
ALTER TABLE "TestGroup" DROP CONSTRAINT "TestGroup_authorId_fkey";

-- DropForeignKey
ALTER TABLE "TestTag" DROP CONSTRAINT "TestTag_authorId_fkey";

-- DropForeignKey
ALTER TABLE "_TestToTestTag" DROP CONSTRAINT "_TestToTestTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_TestToTestTag" DROP CONSTRAINT "_TestToTestTag_B_fkey";

-- AlterTable
ALTER TABLE "AssetLibrary" DROP COLUMN "testId";

-- DropTable
DROP TABLE "Attempt";

-- DropTable
DROP TABLE "Test";

-- DropTable
DROP TABLE "TestGroup";

-- DropTable
DROP TABLE "TestTag";

-- DropTable
DROP TABLE "_TestToTestTag";
