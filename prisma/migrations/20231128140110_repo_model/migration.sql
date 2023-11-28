/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `repositories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "repositories_url_key" ON "repositories"("url");
