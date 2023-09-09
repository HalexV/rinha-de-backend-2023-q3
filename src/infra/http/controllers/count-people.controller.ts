import { BadRequestException, Controller, Get, Res } from '@nestjs/common'
import { CountPeopleUseCase } from '@/domain/my-stacks/application/use-cases/count-people'
import { FastifyReply } from 'fastify'

@Controller('/contagem-pessoas')
export class CountPeopleController {
  constructor(private countPeople: CountPeopleUseCase) {}

  @Get()
  async handle(@Res() res: FastifyReply) {
    const result = await this.countPeople.execute()

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    res.type('text/plain').send(result.value.quantity.toString())
  }
}
