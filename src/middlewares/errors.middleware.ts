import { HttpCode } from '@/constants/enum'
import { NextFunction, Request, Response } from 'express'

export const defaultErrorHandler = (err: any, req: Request, res: Response, _: NextFunction) => {
  const statusCode = err.status || HttpCode.INTERNAL_SERVER_ERROR
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message: err.message
  })
}
