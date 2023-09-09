import { Either, left, right } from '@/core/either'
import { PeopleRepository } from '../repositories/people-repository'
import { Person } from '../../enterprise/entities/person'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'

interface GetPersonUseCaseRequest {
  id: string
}

type GetPersonUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    person: Person
  }
>
@Injectable()
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
