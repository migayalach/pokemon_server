-- CreateTable
CREATE TABLE "Level" (
    "idLevel" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nameLevel" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "idUser" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idLevel" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "User_idLevel_fkey" FOREIGN KEY ("idLevel") REFERENCES "Level" ("idLevel") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Type" (
    "idType" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "create" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Pokemon" (
    "idPokemon" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idType" INTEGER,
    "name" TEXT NOT NULL,
    "life" TEXT,
    "attack" TEXT,
    "defense" TEXT,
    "speed" TEXT,
    "height" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "create" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Pokemon_idType_fkey" FOREIGN KEY ("idType") REFERENCES "Type" ("idType") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Favorite" (
    "idFavorite" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "_FavoriteToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_FavoriteToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Favorite" ("idFavorite") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FavoriteToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("idUser") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_FavoriteToPokemon" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_FavoriteToPokemon_A_fkey" FOREIGN KEY ("A") REFERENCES "Favorite" ("idFavorite") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FavoriteToPokemon_B_fkey" FOREIGN KEY ("B") REFERENCES "Pokemon" ("idPokemon") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteToUser_AB_unique" ON "_FavoriteToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteToUser_B_index" ON "_FavoriteToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteToPokemon_AB_unique" ON "_FavoriteToPokemon"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteToPokemon_B_index" ON "_FavoriteToPokemon"("B");
