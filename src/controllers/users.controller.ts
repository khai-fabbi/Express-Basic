import { IRegisterReqBody } from '@/models/requests/User.requests'
import userService from '@/services/user.service'
import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
export const loginController = (req: Request, res: Response) => {
  console.log(req.body)

  return res.status(200).json({
    data: 'Hello word !!!'
  })
}

export const registerController = async (
  req: Request<ParamsDictionary, any, IRegisterReqBody>,
  res: Response,
  _: NextFunction
) => {
  const rs = await userService.register(req.body)
  console.log(rs)

  return res.status(200).json({
    message: 'Register Succcess !!!',
    data: rs
  })
}
