import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Person } from '@/domain/my-stacks/enterprise/entities/person'

interface PgDriverPerson {
  id: string
  apelido: string
  nome: string
  nascimento: Date
  stack: string | null
  searchable?: string | null
}

export class PgDriverPersonMapper {
  static toDomain(raw: PgDriverPerson): Person {
    return Person.create(
      {
        apelido: raw.apelido,
        nascimento: raw.nascimento,
        nome: raw.nome,
        stack: raw.stack ? raw.stack.split('$') : [],
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPgDriver(person: Person): PgDriverPerson {
    return {
      id: person.id.toString(),
      apelido: person.apelido,
      nascimento: person.nascimento,
      nome: person.nome,
      stack:
        person.stack && person.stack.length > 0 ? person.stack.join('$') : null,
    }
  }
}
