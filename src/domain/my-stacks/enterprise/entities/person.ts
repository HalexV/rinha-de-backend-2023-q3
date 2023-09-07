import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface PersonProps {
  nickname: string
  name: string
  birthdate: Date
  stack: string[]
}

export class Person extends Entity<PersonProps> {
  get nickname() {
    return this.props.nickname
  }

  get name() {
    return this.props.name
  }

  get birthdate() {
    return this.props.birthdate
  }

  get stack() {
    return this.props.stack
  }

  static create(props: PersonProps, id?: UniqueEntityId) {
    const person = new Person(props, id)

    return person
  }
}
