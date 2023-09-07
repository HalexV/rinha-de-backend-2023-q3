import { Either, right } from '@/core/either'
import { PeopleRepository } from '../repositories/people-repository'
import { Person } from '../../enterprise/entities/person'

interface CreatePersonUseCaseRequest {
  nickname: string
  name: string
  birthday: Date
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
    birthday,
    name,
    stack,
  }: CreatePersonUseCaseRequest): Promise<CreatePersonUseCaseResponse> {
    const person = Person.create({
      birthday,
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
