import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Person,
  PersonProps,
} from '@/domain/my-stacks/enterprise/entities/person'

export function makePerson(
  override: Partial<PersonProps> = {},
  id?: UniqueEntityId,
) {
  const person = Person.create(
    {
      apelido: faker.internet.userName(),
      nascimento: faker.date.birthdate(),
      nome: faker.person.fullName(),
      stack: [faker.word.noun(), faker.word.noun()],
      ...override,
    },
    id,
  )

  return person
}
