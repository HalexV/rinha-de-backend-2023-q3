import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Controller, Get } from '@nestjs/common'
import cluster from 'node:cluster'

@Controller('/prisma/metrics')
export class GetPrismaMetricsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle() {
    let myPid: string

    if (cluster.isWorker) {
      if (cluster.worker) {
        myPid = `${process.pid}:${cluster.worker.id}`
      } else {
        myPid = '0'
      }
    } else {
      myPid = `${process.pid}`
    }

    return await this.prisma.$metrics.json({
      globalLabels: {
        appId: myPid,
      },
    })
  }
}
