import { InMemoryPeopleRepository } from 'test/repositories/in-memory-people-repository'
import { makePerson } from 'test/factories/make-person'
import { FetchPeopleUseCase } from './fetch-people'

let inMemoryPeopleRepository: InMemoryPeopleRepository
let sut: FetchPeopleUseCase

describe('Fetch person', () => {
  beforeEach(async () => {
    inMemoryPeopleRepository = new InMemoryPeopleRepository()
    sut = new FetchPeopleUseCase(inMemoryPeopleRepository)

    await inMemoryPeopleRepository.create(
      makePerson({
        apelido: 'HalexV',
        nome: 'Hálex Viotto Gomes',
        stack: ['node', 'javascript'],
      }),
    )

    await inMemoryPeopleRepository.create(
      makePerson({
        apelido: 'LexFree',
        nome: 'John Doe',
        stack: ['node', 'php'],
      }),
    )

    await inMemoryPeopleRepository.create(
      makePerson({
        apelido: 'Mark6',
        nome: 'Mark Henry',
        stack: ['java', 'postgres'],
      }),
    )

    await inMemoryPeopleRepository.create(
      makePerson({
        apelido: 'Fred_',
        nome: 'Fred Minsk',
        stack: ['c', 'c++'],
      }),
    )

    await inMemoryPeopleRepository.create(
      makePerson({
        apelido: 'FreeDOM',
        nome: 'Felix Man',
        stack: ['c#', 'javascript'],
      }),
    )
  })

  it('should be able to fetch people by query', async () => {
    const result = await sut.execute({
      query: 'c',
    })

    expect(result.isRight()).toBeTruthy()

    if (result.isRight()) {
      expect(result.value.people).toHaveLength(3)
      expect(result.value.people).toEqual([
        expect.objectContaining({
          apelido: 'HalexV',
        }),
        expect.objectContaining({
          apelido: 'Fred_',
        }),
        expect.objectContaining({
          apelido: 'FreeDOM',
        }),
      ])
    }
  })
})
