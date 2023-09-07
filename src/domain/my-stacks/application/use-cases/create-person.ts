import { Either, left, right } from '@/core/either'
import { PeopleRepository } from '../repositories/people-repository'
import { Person } from '../../enterprise/entities/person'
import { PersonAlreadyExistsError } from './errors/person-already-exists-error'

interface CreatePersonUseCaseRequest {
  apelido: string
  nome: string
  nascimento: Date
  stack: string[]
}

type CreatePersonUseCaseResponse = Either<
  PersonAlreadyExistsError,
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
    const personWithSameApelido =
      await this.peopleRepository.findByApelido(apelido)

    if (personWithSameApelido) {
      return left(new PersonAlreadyExistsError(apelido))
    }

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
