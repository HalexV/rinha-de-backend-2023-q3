import 'dotenv/config'

import { Pool } from 'pg'
import { randomUUID } from 'node:crypto'

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schemaId)
  return url.toString()
}

const schemaId = randomUUID()

beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseURL(schemaId)

  process.env.DATABASE_URL = databaseURL
  process.env.DATABASE_SCHEMA = schemaId
})

afterAll(async () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: Number(process.env.DB_POOL),
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 10000,
  })

  const client = await pool.connect()
  client.release()

  await pool.query(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)

  await pool.end()
})
