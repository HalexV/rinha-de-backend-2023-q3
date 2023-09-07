import { Either, left, right } from '@/core/either'
import { PeopleRepository } from '../repositories/people-repository'
import { Person } from '../../enterprise/entities/person'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface GetPersonUseCaseRequest {
  id: string
}

type GetPersonUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    person: Person
  }
>

export class GetPersonUseCase {
  constructor(private peopleRepository: PeopleRepository) {}

  async execute({
    id,
  }: GetPersonUseCaseRequest): Promise<GetPersonUseCaseResponse> {
    const person = await this.peopleRepository.findById(id)

    if (!person) {
      return left(new ResourceNotFoundError())
    }

    return right({
      person,
    })
  }
}
