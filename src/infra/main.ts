import { NestFactory } from '@nestjs/core'
import { EnvService } from './env/env.service'
import { AppModule } from './app.module'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
  )

  const envService = app.get(EnvService)
  const port = envService.get('PORT')

  await app.listen(port, '0.0.0.0')
}
bootstrap()
