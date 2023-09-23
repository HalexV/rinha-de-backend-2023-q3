import { PeopleRepository } from '@/domain/my-stacks/application/repositories/people-repository'
import { Person } from '@/domain/my-stacks/enterprise/entities/person'
import { PrismaService } from '../prisma.service'
import { PrismaPersonMapper } from '../mappers/prisma-person-mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaPersonRepository implements PeopleRepository {
  constructor(private prisma: PrismaService) {}

  async create(person: Person): Promise<void> {
    const data = PrismaPersonMapper.toPrisma(person)

    await this.prisma.person.create({
      data,
    })
  }

  async findById(id: string): Promise<Person | null> {
    const person = await this.prisma.person.findUnique({
      where: {
        id,
      },
    })

    if (!person) {
      return null
    }

    return PrismaPersonMapper.toDomain(person)
  }

  async findByApelido(apelido: string): Promise<Person | null> {
    const person = await this.prisma.person.findUnique({
      where: {
        apelido,
      },
    })

    if (!person) {
      return null
    }

    return PrismaPersonMapper.toDomain(person)
  }

  async findManyByQuery(query: string): Promise<Person[]> {
    const people = await this.prisma.person.findMany({
      where: {
        searchable: {
          contains: query,
          mode: 'insensitive',
        },
      },
      take: 50,
    })

    return people.map(PrismaPersonMapper.toDomain)
  }

  async count(): Promise<number> {
    return await this.prisma.person.count()
  }
}
