import AccessService from '@/services/access.service'
import { NextFunction, Request, Response } from 'express'

class AccessController {
  static login() {
    try {
      return 'Login'
    } catch (error) {
      console.error('Error in login:', error)
      throw error
    }
  }

  static async signup(req: Request, res: Response, _: NextFunction) {
    const rs = await AccessService.signup(req.body)
    return res.status(200).json({
      data: rs
    })
  }
}

// const accessController = new AccessController()
export default AccessController
