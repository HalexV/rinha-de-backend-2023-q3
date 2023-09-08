import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CreatePersonController } from './controllers/create-person.controller'
import { CreatePersonUseCase } from '@/domain/my-stacks/application/use-cases/create-person'

@Module({
  imports: [DatabaseModule],
  controllers: [CreatePersonController],
  providers: [CreatePersonUseCase],
})
export class HttpModule {}
