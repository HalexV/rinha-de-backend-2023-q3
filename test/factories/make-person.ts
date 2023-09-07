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
      nickname: faker.internet.userName(),
      birthdate: faker.date.birthdate(),
      name: faker.person.fullName(),
      stack: [faker.word.noun(), faker.word.noun()],
      ...override,
    },
    id,
  )

  return person
}
