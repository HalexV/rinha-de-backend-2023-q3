-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

CREATE OR REPLACE FUNCTION generate_searchable(_nome VARCHAR, _apelido VARCHAR, _stack VARCHAR)
    RETURNS TEXT AS $$
    BEGIN
    RETURN _nome || _apelido || _stack;
    END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- CreateTable
CREATE TABLE "people" (
    "id" TEXT NOT NULL,
    "apelido" VARCHAR(32) NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "stack" TEXT,
    "searchable" TEXT GENERATED ALWAYS AS (generate_searchable(nome, apelido, stack)) STORED,

    CONSTRAINT "people_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "people_apelido_key" ON "people"("apelido");

-- CreateIndex
CREATE INDEX "people_searchable_idx" ON "people" USING GIST ("searchable" gist_trgm_ops (siglen='64'));
