import { Either, right } from '@/core/either'
import { PeopleRepository } from '../repositories/people-repository'

type CountPeopleUseCaseResponse = Either<
  null,
  {
    quantity: number
  }
>

export class CountPeopleUseCase {
  constructor(private peopleRepository: PeopleRepository) {}

  async execute(): Promise<CountPeopleUseCaseResponse> {
    const quantity = await this.peopleRepository.count()

    return right({
      quantity,
    })
  }
}
