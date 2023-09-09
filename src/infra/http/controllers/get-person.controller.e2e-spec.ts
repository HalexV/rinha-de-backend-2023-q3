import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('GET /pessoas/:id (E2E)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })

  it('should be able to get a person by id', async () => {
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
      stack: null,
    }

    const responseJoseCreated = await request(app.getHttpServer())
      .post('/pessoas')
      .send(personJose)

    const responseAnaCreated = await request(app.getHttpServer())
      .post('/pessoas')
      .send(personAna)

    const responseGetJose = await request(app.getHttpServer()).get(
      responseJoseCreated.headers.location,
    )

    const responseGetAna = await request(app.getHttpServer()).get(
      responseAnaCreated.headers.location,
    )

    expect(responseGetJose.statusCode).toBe(200)
    expect(responseGetAna.statusCode).toBe(200)

    expect(responseGetJose.body).toMatchObject(personJose)
    expect(responseGetAna.body).toMatchObject(personAna)
  })

  it('should not be able to get a person that does not exist', async () => {
    const response = await request(app.getHttpServer()).get(
      '/pessoas/non-existent-id',
    )

    expect(response.statusCode).toBe(404)
  })
})
