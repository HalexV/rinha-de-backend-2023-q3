import { PeopleRepository } from '@/domain/my-stacks/application/repositories/people-repository'
import { Person } from '@/domain/my-stacks/enterprise/entities/person'

export class InMemoryPeopleRepository implements PeopleRepository {
  public items: Person[] = []

  async create(person: Person): Promise<void> {
    this.items.push(person)
  }
}
