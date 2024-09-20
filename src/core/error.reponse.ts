import { HttpCode } from '@/constants/enum'

class ErrorResponse extends Error {
  status: number

  constructor(message = 'Internal Server Error', statusCode = HttpCode.INTERNAL_SERVER_ERROR) {
    super(message)
    this.status = statusCode
  }
}

class BadRequestError extends ErrorResponse {
  constructor(message = 'Bad Request') {
    super(message, HttpCode.BAD_REQUEST)
  }
}

class UnauthorizedError extends ErrorResponse {
  constructor(message = 'Unauthorized') {
    super(message, HttpCode.UNAUTHORIZED)
  }
}

class ConflictError extends ErrorResponse {
  constructor(message = 'Conflict') {
    super(message, HttpCode.CONFLICT)
  }
}

class NotFoundError extends ErrorResponse {
  constructor(message = 'Not Found') {
    super(message, HttpCode.NOT_FOUND)
  }
}

class ForbiddenError extends ErrorResponse {
  constructor(message = 'Forbidden') {
    super(message, HttpCode.FORBIDDEN)
  }
}

class EntityError extends ErrorResponse {
  constructor(message = 'Entity Error') {
    super(message, HttpCode.UNPROCESSABLE_ENTITY)
  }
}

export { ErrorResponse, BadRequestError, UnauthorizedError, ConflictError, NotFoundError, ForbiddenError, EntityError }
