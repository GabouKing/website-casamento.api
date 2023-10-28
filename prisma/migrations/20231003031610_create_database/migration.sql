-- CreateTable
CREATE TABLE "Presente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "urlFoto" TEXT NOT NULL,
    "urlProduto" TEXT NOT NULL,
    "nomeProduto" TEXT NOT NULL,
    "comprado" BOOLEAN NOT NULL
);
