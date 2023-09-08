import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Person } from '@/domain/my-stacks/enterprise/entities/person'
import { Prisma, Person as PrismaPerson } from '@prisma/client'

export class PrismaPersonMapper {
  static toDomain(raw: PrismaPerson): Person {
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

  static toPrisma(person: Person): Prisma.PersonUncheckedCreateInput {
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
