import { findApiKeyById } from '@/services/apikey.service'
import { NextFunction, Request, Response } from 'express'

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization'
}

export const checkApiKey = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const apiKey = req.headers[HEADER.API_KEY]
    // const token = req.headers[HEADER.AUTHORIZATION]
    if (!apiKey) {
      return res.status(403).json({
        message: 'Forbidden Error'
      })
    }
    const objKey = await findApiKeyById(apiKey as string)
    // console.log('🚀 ~ checkApiKey ~ objKey:', objKey)
    if (!objKey) {
      return res.status(403).json({
        message: 'Forbidden Error'
      })
    }
    ;(req as any).objKey = objKey
    next()
  } catch (error) {
    next(error)
  }
}

export const checkPermission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const objKey = (req as any).objKey
    if (!objKey || !objKey.permission.includes(permission)) {
      return res.status(403).json({
        message: 'Permission denied'
      })
    }
    next()
  }
}
