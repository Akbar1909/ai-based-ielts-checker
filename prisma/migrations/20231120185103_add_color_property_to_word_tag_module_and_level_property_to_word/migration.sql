-- CreateEnum
CREATE TYPE "WordLevel" AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1', 'C2');

-- AlterTable
ALTER TABLE "AssetLibrary" ADD COLUMN     "viewUrl" TEXT DEFAULT '';

-- AlterTable
ALTER TABLE "Word" ADD COLUMN     "level" "WordLevel";

-- AlterTable
ALTER TABLE "WordTag" ADD COLUMN     "color" TEXT NOT NULL DEFAULT 'red';
