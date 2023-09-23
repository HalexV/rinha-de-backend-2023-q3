import { NestFactory } from '@nestjs/core'
import cluster from 'node:cluster'
import { AppModule } from '../app.module'
import { EnvService } from '../env/env.service'

export class AppClusterService {
  static async clusterize(cb: any): Promise<void> {
    const app = await NestFactory.createApplicationContext(AppModule)
    const envService = app.get(EnvService)

    if (cluster.isPrimary && envService.get('CLUSTER') === true) {
      console.log(`index.js: Primary ${process.pid} is running`)

      for (let i = 0; i < envService.get('CLUSTER_WORKERS'); i++) {
        cluster.fork()
      }

      cluster.on('exit', (worker, code, signal) => {
        console.log(
          `worker ${worker.process.pid} died: code ${code} signal ${signal}`,
        )
      })
      await app.close()
    } else {
      await app.close()
      cb()
    }
  }
}
