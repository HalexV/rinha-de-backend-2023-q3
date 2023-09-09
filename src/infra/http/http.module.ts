import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CreatePersonController } from './controllers/create-person.controller'
import { CreatePersonUseCase } from '@/domain/my-stacks/application/use-cases/create-person'
import { GetPersonController } from './controllers/get-person.controller'
import { GetPersonUseCase } from '@/domain/my-stacks/application/use-cases/get-person'

@Module({
  imports: [DatabaseModule],
  controllers: [CreatePersonController, GetPersonController],
  providers: [CreatePersonUseCase, GetPersonUseCase],
})
export class HttpModule {}
