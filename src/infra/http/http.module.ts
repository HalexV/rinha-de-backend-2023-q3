import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CreatePersonController } from './controllers/create-person.controller'
import { CreatePersonUseCase } from '@/domain/my-stacks/application/use-cases/create-person'
import { GetPersonController } from './controllers/get-person.controller'
import { GetPersonUseCase } from '@/domain/my-stacks/application/use-cases/get-person'
import { FetchPeopleController } from './controllers/fetch-people.controller'
import { FetchPeopleUseCase } from '@/domain/my-stacks/application/use-cases/fetch-people'
import { CountPeopleController } from './controllers/count-people.controller'
import { CountPeopleUseCase } from '@/domain/my-stacks/application/use-cases/count-people'
import { GetPrismaMetricsController } from './controllers/get-prisma-metrics.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreatePersonController,
    GetPersonController,
    FetchPeopleController,
    CountPeopleController,
    GetPrismaMetricsController,
  ],
  providers: [
    CreatePersonUseCase,
    GetPersonUseCase,
    FetchPeopleUseCase,
    CountPeopleUseCase,
  ],
})
export class HttpModule {}
