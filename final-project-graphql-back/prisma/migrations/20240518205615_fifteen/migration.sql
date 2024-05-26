/*
  Warnings:

  - A unique constraint covering the columns `[articleId]` on the table `LikesQuantity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LikesQuantity_articleId_key" ON "LikesQuantity"("articleId");
