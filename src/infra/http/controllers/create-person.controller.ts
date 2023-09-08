import { CreatePersonUseCase } from '@/domain/my-stacks/application/use-cases/create-person'
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { FastifyReply } from 'fastify'

const createPersonBodySchema = z.object({
  apelido: z.string().max(32),
  nome: z.string().max(100),
  nascimento: z
    .string()
    .max(10)
    .regex(/^\d\d\d\d-\d\d-\d\d$/)
    .transform((val) => new Date(val)),
  stack: z.array(z.string().max(32)).min(1),
})

const bodyValidationPipe = new ZodValidationPipe(createPersonBodySchema)

type CreatePersonBodySchema = z.infer<typeof createPersonBodySchema>

@Controller('/pessoas')
export class CreatePersonController {
  constructor(private createPerson: CreatePersonUseCase) {}

  @Post()
  async handle(
    @Res({ passthrough: true }) res: FastifyReply,
    @Body(bodyValidationPipe) body: CreatePersonBodySchema,
  ) {
    const { apelido, nascimento, nome, stack } = body

    const result = await this.createPerson.execute({
      apelido,
      nascimento,
      nome,
      stack,
    })

    if (result.isLeft()) {
      throw new BadRequestException(result.value)
    }

    res.header('location', `/pessoas/${result.value.person.id}`)
  }
}
