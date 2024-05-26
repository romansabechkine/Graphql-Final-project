/*
  Warnings:

  - You are about to drop the column `numberOfAngry` on the `LikesQuantity` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfHeart` on the `LikesQuantity` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfLaugh` on the `LikesQuantity` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfMean` on the `LikesQuantity` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfSmile` on the `LikesQuantity` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfThumbDown` on the `LikesQuantity` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfThumbUp` on the `LikesQuantity` table. All the data in the column will be lost.
  - Added the required column `likeType` to the `LikesQuantity` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LikesQuantity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "likeType" TEXT NOT NULL,
    "numberOfLikeType" INTEGER NOT NULL DEFAULT 0,
    "articleId" TEXT NOT NULL,
    CONSTRAINT "LikesQuantity_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_LikesQuantity" ("articleId", "id") SELECT "articleId", "id" FROM "LikesQuantity";
DROP TABLE "LikesQuantity";
ALTER TABLE "new_LikesQuantity" RENAME TO "LikesQuantity";
CREATE UNIQUE INDEX "LikesQuantity_id_key" ON "LikesQuantity"("id");
CREATE UNIQUE INDEX "LikesQuantity_articleId_key" ON "LikesQuantity"("articleId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
