import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('GET /pessoas?t=[: termo da busca] (E2E)', () => {
  let app: INestApplication
  let personJose
  let personAna
  let personHalex

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    await app.init()

    personJose = {
      apelido: 'josé',
      nome: 'José Roberto',
      nascimento: '2000-10-01',
      stack: ['C#', 'Node', 'Oracle'],
    }

    personAna = {
      apelido: 'ana',
      nome: 'Ana Barbosa',
      nascimento: '1985-09-23',
      stack: ['Node', 'Postgres'],
    }

    personHalex = {
      apelido: 'HalexV',
      nome: 'Hálex Viotto Gomes',
      nascimento: '1995-04-30',
      stack: ['Node', 'Postgres'],
    }

    await request(app.getHttpServer()).post('/pessoas').send(personJose)
    await request(app.getHttpServer()).post('/pessoas').send(personAna)
    await request(app.getHttpServer()).post('/pessoas').send(personHalex)
  })

  it('should be able to fetch people by query param', async () => {
    const responseTNode = await request(app.getHttpServer())
      .get('/pessoas')
      .query({
        t: 'node',
      })

    const responseTBerto = await request(app.getHttpServer())
      .get('/pessoas')
      .query({
        t: 'berto',
      })

    const responseTPython = await request(app.getHttpServer())
      .get('/pessoas')
      .query({
        t: 'Python',
      })

    const responseTHalexV = await request(app.getHttpServer())
      .get('/pessoas')
      .query({
        t: 'HalexV',
      })

    expect(responseTNode.statusCode).toBe(200)
    expect(responseTBerto.statusCode).toBe(200)
    expect(responseTPython.statusCode).toBe(200)
    expect(responseTHalexV.statusCode).toBe(200)

    expect(responseTNode.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining(personJose),
        expect.objectContaining(personAna),
      ]),
    )

    expect(responseTBerto.body).toEqual([expect.objectContaining(personJose)])

    expect(responseTPython.body).toEqual([])

    expect(responseTHalexV.body).toEqual([expect.objectContaining(personHalex)])
  })

  it('should not be able to fetch people without query param', async () => {
    const response = await request(app.getHttpServer()).get('/pessoas')

    expect(response.statusCode).toBe(400)
  })

  it('should not be able to fetch people with wrong query param', async () => {
    const response = await request(app.getHttpServer()).get('/pessoas').query({
      query: 'node',
    })

    expect(response.statusCode).toBe(400)
  })
})
