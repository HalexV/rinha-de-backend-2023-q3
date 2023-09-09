import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { PersonPresenter } from '../presenters/person-presenter'
import { FetchPeopleUseCase } from '@/domain/my-stacks/application/use-cases/fetch-people'

const tQueryParamSchema = z.string()

const paramValidationPipe = new ZodValidationPipe(tQueryParamSchema)

type TQueryParamSchema = z.infer<typeof tQueryParamSchema>

@Controller('/pessoas')
export class FetchPeopleController {
  constructor(private fetchPeople: FetchPeopleUseCase) {}

  @Get()
  async handle(@Query('t', paramValidationPipe) t: TQueryParamSchema) {
    const result = await this.fetchPeople.execute({
      query: t,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return result.value.people.map((person) => PersonPresenter.toHTTP(person))
  }
}
