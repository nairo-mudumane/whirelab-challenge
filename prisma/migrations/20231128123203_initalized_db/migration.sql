-- CreateTable
CREATE TABLE "repositories" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "techs" TEXT[],
    "likes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "repositories_pkey" PRIMARY KEY ("id")
);
