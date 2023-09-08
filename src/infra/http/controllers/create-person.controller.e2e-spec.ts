import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('POST /pessoas (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  it('should be able to create a person', async () => {
    const response = await request(app.getHttpServer())
      .post('/pessoas')
      .send({
        apelido: 'josé',
        nome: 'José Roberto',
        nascimento: '2000-10-01',
        stack: ['C#', 'Node', 'Oracle'],
      })

    expect(response.statusCode).toBe(201)
    expect(response.headers.location.includes('/pessoas/')).toBeTruthy()

    const personOnDatabase = await prisma.person.findUnique({
      where: {
        apelido: 'josé',
      },
    })

    expect(personOnDatabase).toBeTruthy()
  })

  it('should not be able to create a person with same apelido', async () => {
    await request(app.getHttpServer())
      .post('/pessoas')
      .send({
        apelido: 'josé',
        nome: 'José Roberto',
        nascimento: '2000-10-01',
        stack: ['C#', 'Node', 'Oracle'],
      })

    const response = await request(app.getHttpServer())
      .post('/pessoas')
      .send({
        apelido: 'josé',
        nome: 'José Roberto',
        nascimento: '2000-10-01',
        stack: ['C#', 'Node', 'Oracle'],
      })

    expect(response.statusCode).toBe(422)
  })

  it('should not be able to create a person when name is a null value', async () => {
    const response = await request(app.getHttpServer()).post('/pessoas').send({
      apelido: 'ana',
      nome: null,
      nascimento: '1985-09-23',
      stack: null,
    })

    expect(response.statusCode).toBe(422)
  })

  it('should not be able to create a person when apelido is a null value', async () => {
    const response = await request(app.getHttpServer()).post('/pessoas').send({
      apelido: null,
      nome: 'Ana Barbosa',
      nascimento: '1985-01-23',
      stack: null,
    })

    expect(response.statusCode).toBe(422)
  })

  it('should not be able to create a person when nascimento is a null value', async () => {
    const response = await request(app.getHttpServer()).post('/pessoas').send({
      apelido: 'ana',
      nome: 'Ana Barbosa',
      nascimento: null,
      stack: null,
    })

    expect(response.statusCode).toBe(422)
  })

  it('should not be able to create a person when nome is not a string', async () => {
    const response = await request(app.getHttpServer()).post('/pessoas').send({
      apelido: 'apelido',
      nome: 1, // nome deve ser string e não número
      nascimento: '1985-01-01',
      stack: null,
    })

    expect(response.statusCode).toBe(400)
  })
})
