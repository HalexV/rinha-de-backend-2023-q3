import { Person } from '@/domain/my-stacks/enterprise/entities/person'

export class PersonPresenter {
  static toHTTP(person: Person) {
    return {
      id: person.id.toString(),
      apelido: person.apelido,
      nome: person.nome,
      nascimento: person.nascimento.toISOString().split('T')[0],
      stack: person.stack.length === 0 ? null : person.stack,
    }
  }
}
