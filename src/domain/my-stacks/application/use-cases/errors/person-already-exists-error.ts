import { UseCaseError } from '@/core/errors/use-case-error'

export class PersonAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Person '${identifier}' already exists.`)
  }
}
