import { Person } from '@/domain/my-stacks/enterprise/entities/person'

export abstract class PeopleRepository {
  abstract create(person: Person): Promise<void>
}
