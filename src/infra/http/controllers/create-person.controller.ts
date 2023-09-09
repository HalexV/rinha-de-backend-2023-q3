import { CreatePersonUseCase } from '@/domain/my-stacks/application/use-cases/create-person'
import {
  Body,
  Controller,
  Post,
  Res,
  UnprocessableEntityException,
} from '@nestjs/common'
import { z } from 'zod'
import { FastifyReply } from 'fastify'
import { ZodValidationPipeToCreatePerson } from '../pipes/zod-validation-pipe-to-create-person'

const createPersonBodySchema = z.object({
  apelido: z.string().max(32),
  nome: z.string().max(100),
  nascimento: z
    .string()
    .max(10)
    .regex(/^\d\d\d\d-\d\d-\d\d$/)
    .transform((val) => new Date(val)),
  stack: z.array(z.string().max(32)).min(1).nullable(),
})

const bodyValidationPipe = new ZodValidationPipeToCreatePerson(
  createPersonBodySchema,
)

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
      stack: stack ?? [],
    })

    if (result.isLeft()) {
      throw new UnprocessableEntityException(result.value.message)
    }

    res.header('location', `/pessoas/${result.value.person.id}`)
  }
}
