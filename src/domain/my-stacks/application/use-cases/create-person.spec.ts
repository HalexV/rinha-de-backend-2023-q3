import { InMemoryPeopleRepository } from 'test/repositories/in-memory-people-repository'
import { CreatePersonUseCase } from './create-person'

let inMemoryPeopleRepository: InMemoryPeopleRepository
let sut: CreatePersonUseCase

describe('Create person', () => {
  beforeEach(() => {
    inMemoryPeopleRepository = new InMemoryPeopleRepository()
    sut = new CreatePersonUseCase(inMemoryPeopleRepository)
  })

  it('should be able to create a person', async () => {
    const result = await sut.execute({
      birthday: new Date('1995-04-30'),
      name: 'Halex Viotto Gomes',
      nickname: 'HalexV',
      stack: ['node', 'javascript'],
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryPeopleRepository.items[0]).toEqual(result.value?.person)
  })
})
