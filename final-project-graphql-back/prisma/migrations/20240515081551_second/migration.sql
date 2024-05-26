-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Article" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "Article_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Article" ("authorId", "body", "createdAt", "id", "title", "updatedAt") SELECT "authorId", "body", "createdAt", "id", "title", "updatedAt" FROM "Article";
DROP TABLE "Article";
ALTER TABLE "new_Article" RENAME TO "Article";
CREATE UNIQUE INDEX "Article_id_key" ON "Article"("id");
CREATE TABLE "new_Like" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "likeType" TEXT NOT NULL,
    CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Like_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Like" ("articleId", "id", "likeType", "userId") SELECT "articleId", "id", "likeType", "userId" FROM "Like";
DROP TABLE "Like";
ALTER TABLE "new_Like" RENAME TO "Like";
CREATE UNIQUE INDEX "Like_id_key" ON "Like"("id");
CREATE TABLE "new_LikesQuantity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numberOfHeart" INTEGER NOT NULL DEFAULT 0,
    "numberOfSmile" INTEGER NOT NULL DEFAULT 0,
    "numberOfLaugh" INTEGER NOT NULL DEFAULT 0,
    "numberOfThumbUp" INTEGER NOT NULL DEFAULT 0,
    "numberOfThumbDown" INTEGER NOT NULL DEFAULT 0,
    "numberOfAngry" INTEGER NOT NULL DEFAULT 0,
    "numberOfMean" INTEGER NOT NULL DEFAULT 0,
    "articleId" TEXT NOT NULL,
    CONSTRAINT "LikesQuantity_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_LikesQuantity" ("articleId", "id", "numberOfAngry", "numberOfHeart", "numberOfLaugh", "numberOfMean", "numberOfSmile", "numberOfThumbDown", "numberOfThumbUp") SELECT "articleId", "id", "numberOfAngry", "numberOfHeart", "numberOfLaugh", "numberOfMean", "numberOfSmile", "numberOfThumbDown", "numberOfThumbUp" FROM "LikesQuantity";
DROP TABLE "LikesQuantity";
ALTER TABLE "new_LikesQuantity" RENAME TO "LikesQuantity";
CREATE UNIQUE INDEX "LikesQuantity_id_key" ON "LikesQuantity"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
