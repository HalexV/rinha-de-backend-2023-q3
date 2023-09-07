import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface PersonProps {
  apelido: string
  nome: string
  nascimento: Date
  stack: string[]
}

export class Person extends Entity<PersonProps> {
  get apelido() {
    return this.props.apelido
  }

  get nome() {
    return this.props.nome
  }

  get nascimento() {
    return this.props.nascimento
  }

  get stack() {
    return this.props.stack
  }

  static create(props: PersonProps, id?: UniqueEntityId) {
    const person = new Person(props, id)

    return person
  }
}
