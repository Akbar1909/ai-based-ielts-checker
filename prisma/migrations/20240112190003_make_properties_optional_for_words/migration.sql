-- AlterTable
ALTER TABLE "Word" ALTER COLUMN "example" DROP NOT NULL,
ALTER COLUMN "isPublic" DROP NOT NULL,
ALTER COLUMN "definition" DROP NOT NULL;