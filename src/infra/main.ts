import { NestFactory } from '@nestjs/core'
import { EnvService } from './env/env.service'
import { AppModule } from './app.module'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'

import cluster from 'node:cluster'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )

  const envService = app.get(EnvService)
  const port = envService.get('PORT')

  await app.listen(port, '0.0.0.0')
}

const app = NestFactory.create<NestFastifyApplication>(
  AppModule,
  new FastifyAdapter({
    logger: true,
  }),
)

app.then((app) => {
  const envService = app.get(EnvService)

  if (cluster.isPrimary && envService.get('CLUSTER') === true) {
    console.log(`index.js: Primary ${process.pid} is running`)

    for (let i = 0; i < envService.get('CLUSTER_WORKERS'); i++) {
      cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(
        `index.js: worker ${worker.process.pid} died: code ${code} signal ${signal}`,
      )
    })
  } else {
    bootstrap()
  }
})
