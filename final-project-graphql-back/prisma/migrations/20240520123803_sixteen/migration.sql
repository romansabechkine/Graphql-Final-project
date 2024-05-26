-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LikesQuantity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "likeType" TEXT NOT NULL,
    "numberOfLikeType" INTEGER NOT NULL DEFAULT 1,
    "articleId" TEXT NOT NULL,
    CONSTRAINT "LikesQuantity_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_LikesQuantity" ("articleId", "id", "likeType", "numberOfLikeType") SELECT "articleId", "id", "likeType", "numberOfLikeType" FROM "LikesQuantity";
DROP TABLE "LikesQuantity";
ALTER TABLE "new_LikesQuantity" RENAME TO "LikesQuantity";
CREATE UNIQUE INDEX "LikesQuantity_id_key" ON "LikesQuantity"("id");
CREATE UNIQUE INDEX "LikesQuantity_articleId_key" ON "LikesQuantity"("articleId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
