-- CreateTable
CREATE TABLE "Word" (
    "wordId" SERIAL NOT NULL,
    "wordTagId" INTEGER NOT NULL,
    "tag" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "example" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("wordId")
);

-- CreateTable
CREATE TABLE "WordTag" (
    "wordTagId" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WordTag_pkey" PRIMARY KEY ("wordTagId")
);

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_wordTagId_fkey" FOREIGN KEY ("wordTagId") REFERENCES "WordTag"("wordTagId") ON DELETE RESTRICT ON UPDATE CASCADE;
