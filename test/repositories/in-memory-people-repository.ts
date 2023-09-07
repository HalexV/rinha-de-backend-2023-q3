import { PeopleRepository } from '@/domain/my-stacks/application/repositories/people-repository'
import { Person } from '@/domain/my-stacks/enterprise/entities/person'

export class InMemoryPeopleRepository implements PeopleRepository {
  public items: Person[] = []

  async create(person: Person): Promise<void> {
    this.items.push(person)
  }

  async findById(id: string): Promise<Person | null> {
    const person = this.items.find((person) => person.id.toString() === id)

    if (!person) {
      return null
    }

    return person
  }

  async findManyByQuery(query: string): Promise<Person[]> {
    const people = this.items.filter((person) => {
      const str = `${person.apelido} ${person.nome} ${person.stack.join(' ')}`

      return str.includes(query)
    })

    return people
  }

  async count(): Promise<number> {
    return this.items.length
  }
}
