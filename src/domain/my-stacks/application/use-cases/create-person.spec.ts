import { InMemoryPeopleRepository } from 'test/repositories/in-memory-people-repository'
import { CreatePersonUseCase } from './create-person'
import { makePerson } from 'test/factories/make-person'
import { PersonAlreadyExistsError } from './errors/person-already-exists-error'

let inMemoryPeopleRepository: InMemoryPeopleRepository
let sut: CreatePersonUseCase

describe('Create person', () => {
  beforeEach(() => {
    inMemoryPeopleRepository = new InMemoryPeopleRepository()
    sut = new CreatePersonUseCase(inMemoryPeopleRepository)
  })

  it('should be able to create a person', async () => {
    const result = await sut.execute({
      nascimento: new Date('1995-04-30'),
      nome: 'Halex Viotto Gomes',
      apelido: 'HalexV',
      stack: ['node', 'javascript'],
    })

    expect(result.isRight()).toBeTruthy()

    if (result.isRight()) {
      expect(inMemoryPeopleRepository.items[0]).toEqual(result.value.person)
    }
  })

  it('should not be able to create a person with same apelido', async () => {
    const person = makePerson({
      apelido: 'HalexV',
    })

    await inMemoryPeopleRepository.create(person)

    const result = await sut.execute({
      nascimento: new Date('1995-04-30'),
      nome: 'Halex Viotto Gomes',
      apelido: 'HalexV',
      stack: ['node', 'javascript'],
    })

    expect(result.isLeft()).toBeTruthy()

    if (result.isLeft()) {
      expect(result.value).toBeInstanceOf(PersonAlreadyExistsError)
    }
  })
})
