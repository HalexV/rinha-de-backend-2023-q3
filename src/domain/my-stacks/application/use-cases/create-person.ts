import { Either, right } from '@/core/either'
import { PeopleRepository } from '../repositories/people-repository'
import { Person } from '../../enterprise/entities/person'

interface CreatePersonUseCaseRequest {
  apelido: string
  nome: string
  nascimento: Date
  stack: string[]
}

type CreatePersonUseCaseResponse = Either<
  null,
  {
    person: Person
  }
>

export class CreatePersonUseCase {
  constructor(private peopleRepository: PeopleRepository) {}

  async execute({
    apelido,
    nascimento,
    nome,
    stack,
  }: CreatePersonUseCaseRequest): Promise<CreatePersonUseCaseResponse> {
    const person = Person.create({
      nascimento,
      nome,
      apelido,
      stack,
    })

    await this.peopleRepository.create(person)

    return right({
      person,
    })
  }
}
