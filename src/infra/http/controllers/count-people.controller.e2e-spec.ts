import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('GET /contagem-pessoas (E2E)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })

  it('should be able to count 0 people', async () => {
    const response = await request(app.getHttpServer()).get('/contagem-pessoas')

    expect(response.headers['content-type']).contains('text/plain')
    expect(response.text).toBe('0')
  })

  it('should be able to count 3 people', async () => {
    const personJose = {
      apelido: 'josé',
      nome: 'José Roberto',
      nascimento: '2000-10-01',
      stack: ['C#', 'Node', 'Oracle'],
    }

    const personAna = {
      apelido: 'ana',
      nome: 'Ana Barbosa',
      nascimento: '1985-09-23',
      stack: ['Node', 'Postgres'],
    }

    const personHalex = {
      apelido: 'HalexV',
      nome: 'Hálex Viotto Gomes',
      nascimento: '1995-04-30',
      stack: ['Node', 'Postgres'],
    }

    await request(app.getHttpServer()).post('/pessoas').send(personJose)
    await request(app.getHttpServer()).post('/pessoas').send(personAna)
    await request(app.getHttpServer()).post('/pessoas').send(personHalex)

    const response = await request(app.getHttpServer()).get('/contagem-pessoas')

    expect(response.headers['content-type']).contains('text/plain')
    expect(response.text).toBe('3')
  })
})
