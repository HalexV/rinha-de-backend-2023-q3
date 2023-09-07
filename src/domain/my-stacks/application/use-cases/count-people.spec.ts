import { InMemoryPeopleRepository } from 'test/repositories/in-memory-people-repository'
import { makePerson } from 'test/factories/make-person'
import { CountPeopleUseCase } from './count-people'

let inMemoryPeopleRepository: InMemoryPeopleRepository
let sut: CountPeopleUseCase

describe('Count people', () => {
  beforeEach(async () => {
    inMemoryPeopleRepository = new InMemoryPeopleRepository()
    sut = new CountPeopleUseCase(inMemoryPeopleRepository)

    for (let i = 0; i < 50; i++) {
      await inMemoryPeopleRepository.create(makePerson())
    }
  })

  it('should be able to count people', async () => {
    const result = await sut.execute()

    expect(result.isRight()).toBeTruthy()

    if (result.isRight()) {
      expect(result.value.quantity).toBe(50)
    }
  })
})
