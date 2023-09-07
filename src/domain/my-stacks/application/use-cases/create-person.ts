import { Either, right } from '@/core/either'
import { PeopleRepository } from '../repositories/people-repository'
import { Person } from '../../enterprise/entities/person'

interface CreatePersonUseCaseRequest {
  nickname: string
  name: string
  birthdate: Date
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
    nickname,
    birthdate,
    name,
    stack,
  }: CreatePersonUseCaseRequest): Promise<CreatePersonUseCaseResponse> {
    const person = Person.create({
      birthdate,
      name,
      nickname,
      stack,
    })

    await this.peopleRepository.create(person)

    return right({
      person,
    })
  }
}
