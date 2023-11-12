-- DropForeignKey
ALTER TABLE "AssetLibrary" DROP CONSTRAINT "AssetLibrary_testId_fkey";

-- AlterTable
ALTER TABLE "AssetLibrary" ALTER COLUMN "testId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "AssetLibrary" ADD CONSTRAINT "AssetLibrary_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("testId") ON DELETE SET NULL ON UPDATE CASCADE;
