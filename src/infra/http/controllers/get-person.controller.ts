import { Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { GetPersonUseCase } from '@/domain/my-stacks/application/use-cases/get-person'
import { PersonPresenter } from '../presenters/person-presenter'

const idRouteParamSchema = z.string()

const paramValidationPipe = new ZodValidationPipe(idRouteParamSchema)

type IdRouteParamSchema = z.infer<typeof idRouteParamSchema>

@Controller('/pessoas')
export class GetPersonController {
  constructor(private getPerson: GetPersonUseCase) {}

  @Get(':id')
  async handle(@Param('id', paramValidationPipe) id: IdRouteParamSchema) {
    const result = await this.getPerson.execute({
      id,
    })

    if (result.isLeft()) {
      throw new NotFoundException(result.value.message)
    }

    return PersonPresenter.toHTTP(result.value.person)
  }
}
