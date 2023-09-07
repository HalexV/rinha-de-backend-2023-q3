import { Person } from '@/domain/my-stacks/enterprise/entities/person'

export abstract class PeopleRepository {
  abstract create(person: Person): Promise<void>
  abstract findById(id: string): Promise<Person | null>
  abstract findManyByQuery(query: string): Promise<Person[]>
  abstract count(): Promise<number>
}
