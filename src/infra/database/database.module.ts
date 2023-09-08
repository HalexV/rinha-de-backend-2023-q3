import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PeopleRepository } from '@/domain/my-stacks/application/repositories/people-repository'
import { PrismaPersonRepository } from './prisma/repositories/prisma-people-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: PeopleRepository,
      useClass: PrismaPersonRepository,
    },
  ],
  exports: [PrismaService, PeopleRepository],
})
export class DatabaseModule {}
