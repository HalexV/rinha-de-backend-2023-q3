import { Either, right } from '@/core/either'
import { PeopleRepository } from '../repositories/people-repository'
import { Person } from '../../enterprise/entities/person'
import { Injectable } from '@nestjs/common'

interface FetchPeopleUseCaseRequest {
  query: string
}

type FetchPeopleUseCaseResponse = Either<
  null,
  {
    people: Person[]
  }
>
@Injectable()
export class FetchPeopleUseCase {
  constructor(private peopleRepository: PeopleRepository) {}

  async execute({
    query,
  }: FetchPeopleUseCaseRequest): Promise<FetchPeopleUseCaseResponse> {
    const people = await this.peopleRepository.findManyByQuery(query)

    return right({
      people,
    })
  }
}
