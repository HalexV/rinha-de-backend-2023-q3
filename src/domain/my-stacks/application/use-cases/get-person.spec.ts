import { InMemoryPeopleRepository } from 'test/repositories/in-memory-people-repository'
import { GetPersonUseCase } from './get-person'
import { makePerson } from 'test/factories/make-person'

let inMemoryPeopleRepository: InMemoryPeopleRepository
let sut: GetPersonUseCase

describe('Get person', () => {
  beforeEach(() => {
    inMemoryPeopleRepository = new InMemoryPeopleRepository()
    sut = new GetPersonUseCase(inMemoryPeopleRepository)
  })

  it('should be able to get a person by id', async () => {
    const newPerson = makePerson()

    await inMemoryPeopleRepository.create(newPerson)

    const result = await sut.execute({
      id: newPerson.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()

    if (result.isRight()) {
      expect(result.value.person.name).toEqual(newPerson.name)
    }
  })
})
