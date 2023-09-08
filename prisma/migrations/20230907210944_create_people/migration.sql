-- CreateTable
CREATE TABLE "people" (
    "id" TEXT NOT NULL,
    "apelido" VARCHAR(32) NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "stack" TEXT,

    CONSTRAINT "people_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "people_apelido_key" ON "people"("apelido");
