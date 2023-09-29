import { Module } from '@nestjs/common'
import { PeopleRepository } from '@/domain/my-stacks/application/repositories/people-repository'
import { PgDriverService } from './pg-driver/pg-driver.service'
import { PgDriverPersonRepository } from './pg-driver/repositories/pg-driver-people-repository'

@Module({
  providers: [
    PgDriverService,
    {
      provide: PeopleRepository,
      useClass: PgDriverPersonRepository,
    },
  ],
  exports: [PgDriverService, PeopleRepository],
})
export class DatabaseModule {}
