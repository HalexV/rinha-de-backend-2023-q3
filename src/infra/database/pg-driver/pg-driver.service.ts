import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import pg from 'pg'

@Injectable()
export class PgDriverService
  extends pg.Pool
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      connectionString: process.env.DATABASE_URL,
      max: Number(process.env.DB_POOL),
      idleTimeoutMillis: 0,
      connectionTimeoutMillis: 10000,
    })
  }

  async onModuleInit() {
    const client = await this.connect()
    client.release()

    try {
      await this.query(`
    CREATE SCHEMA IF NOT EXISTS "${process.env.DATABASE_SCHEMA ?? 'public'}";

    CREATE EXTENSION IF NOT EXISTS "pg_trgm";

    CREATE OR REPLACE FUNCTION generate_searchable(_nome VARCHAR, _apelido VARCHAR, _stack VARCHAR)
        RETURNS TEXT AS $$
        BEGIN
        RETURN _nome || _apelido || _stack;
        END;
    $$ LANGUAGE plpgsql IMMUTABLE;

    CREATE TABLE IF NOT EXISTS "${
      process.env.DATABASE_SCHEMA ?? 'public'
    }"."people" (
        "id" TEXT NOT NULL,
        "apelido" VARCHAR(32) NOT NULL,
        "nome" VARCHAR(100) NOT NULL,
        "nascimento" TIMESTAMP(3) NOT NULL,
        "stack" TEXT,
        "searchable" TEXT GENERATED ALWAYS AS (generate_searchable(nome, apelido, stack)) STORED,

        CONSTRAINT "people_pkey" PRIMARY KEY ("id")
    );

    CREATE UNIQUE INDEX IF NOT EXISTS "people_apelido_key" ON "${
      process.env.DATABASE_SCHEMA ?? 'public'
    }"."people" USING btree (apelido);

    CREATE INDEX IF NOT EXISTS "people_searchable_idx" ON "${
      process.env.DATABASE_SCHEMA ?? 'public'
    }"."people" USING GIST ("searchable" gist_trgm_ops (siglen='64'));
    `)
    } catch (error) {}

    return this
  }

  async onModuleDestroy() {
    await this.end()
    return
  }
}
