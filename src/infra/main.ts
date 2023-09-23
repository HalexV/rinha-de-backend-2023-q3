import { NestFactory } from '@nestjs/core'
import { EnvService } from './env/env.service'
import { AppModule } from './app.module'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { AppClusterService } from './cluster/cluster.service'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )

  const envService = app.get(EnvService)
  const port = envService.get('PORT')
  console.log(`${process.pid} started`)
  await app.listen(port, '0.0.0.0')
}

AppClusterService.clusterize(bootstrap)
