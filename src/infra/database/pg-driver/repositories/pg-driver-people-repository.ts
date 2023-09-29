import { PeopleRepository } from '@/domain/my-stacks/application/repositories/people-repository'
import { Person } from '@/domain/my-stacks/enterprise/entities/person'
import { Injectable } from '@nestjs/common'
import { PgDriverService } from '../pg-driver.service'
import { PgDriverPersonMapper } from '../mappers/pg-driver-person-mapper'

@Injectable()
export class PgDriverPersonRepository implements PeopleRepository {
  constructor(private pg: PgDriverService) {}

  async create(person: Person): Promise<void> {
    const query = `
    INSERT INTO
    "${process.env.DATABASE_SCHEMA ?? 'public'}"."people"(
        id,
        apelido,
        nome,
        nascimento,
        stack
     )
    VALUES (
        $1,
        $2,
        $3,
        $4,
        $5
    );
    `
    const { id, apelido, nascimento, nome, stack } =
      PgDriverPersonMapper.toPgDriver(person)

    await this.pg.query(query, [id, apelido, nome, nascimento, stack])
  }

  async findById(id: string): Promise<Person | null> {
    const query = `
    SELECT
        id,
        apelido,
        nome,
        nascimento,
        stack
    FROM
    "${process.env.DATABASE_SCHEMA ?? 'public'}"."people"
    WHERE "id" = $1;
    `

    const queryResult = await this.pg.query(query, [id])
    const [person] = queryResult.rows

    if (!person) {
      return null
    }

    return PgDriverPersonMapper.toDomain(person)
  }

  async findByApelido(apelido: string): Promise<Person | null> {
    const query = `
    SELECT
        id,
        apelido,
        nome,
        nascimento,
        stack
    FROM
    "${process.env.DATABASE_SCHEMA ?? 'public'}"."people"
    WHERE
        apelido = $1
    `

    const queryResult = await this.pg.query(query, [apelido])
    const [person] = queryResult.rows

    if (!person) {
      return null
    }

    return PgDriverPersonMapper.toDomain(person)
  }

  async findManyByQuery(query: string): Promise<Person[]> {
    const queryStr = `
    SELECT
        id,
        apelido,
        nome,
        nascimento,
        stack
    FROM
    "${process.env.DATABASE_SCHEMA ?? 'public'}"."people"
    WHERE
        searchable ILIKE $1
    LIMIT 50;
    `
    const queryResult = await this.pg.query(queryStr, [`%${query}%`])

    const people = queryResult.rows

    return people.map(PgDriverPersonMapper.toDomain)
  }

  async count(): Promise<number> {
    const query = `
    SELECT COUNT(1) FROM "${process.env.DATABASE_SCHEMA ?? 'public'}"."people"
    `
    const queryResult = await this.pg.query(query)
    const [{ count }] = queryResult.rows

    return Number(count)
  }
}
