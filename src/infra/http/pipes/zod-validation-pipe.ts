import {
  PipeTransform,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common'
import { ZodError, ZodSchema, z } from 'zod'
import { fromZodError } from 'zod-validation-error'

function someInvalidNullable(error: ZodError): boolean {
  const propertiesNotNullable = ['apelido', 'nome', 'nascimento']

  for (const issue of error.issues) {
    if (issue.code === z.ZodIssueCode.invalid_type) {
      if (
        propertiesNotNullable.includes(issue.path[0].toString()) &&
        issue.received === 'null'
      ) {
        return true
      }
    }
  }

  return false
}

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        if (someInvalidNullable(error)) {
          throw new UnprocessableEntityException({
            message: 'Validation failed',
            statusCode: 422,
            errors: fromZodError(error),
          })
        }

        throw new BadRequestException({
          message: 'Validation failed',
          statusCode: 400,
          errors: fromZodError(error),
        })
      }

      throw new BadRequestException('Validation failed')
    }
  }
}
