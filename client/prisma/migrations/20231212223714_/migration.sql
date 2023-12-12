-- CreateTable
CREATE TABLE "Level" (
    "idLevel" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
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
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Pokemon" (
    "idPokemon" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "life" INTEGER NOT NULL,
    "attack" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "create" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "PokemonType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idType" INTEGER NOT NULL,
    "idPokemon" INTEGER NOT NULL,
    CONSTRAINT "PokemonType_idPokemon_fkey" FOREIGN KEY ("idPokemon") REFERENCES "Pokemon" ("idPokemon") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PokemonType_idType_fkey" FOREIGN KEY ("idType") REFERENCES "Type" ("idType") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Favorite" (
    "idFavorite" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUser" INTEGER NOT NULL,
    "idPokemon" INTEGER NOT NULL,
    CONSTRAINT "Favorite_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Favorite_idPokemon_fkey" FOREIGN KEY ("idPokemon") REFERENCES "Pokemon" ("idPokemon") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
