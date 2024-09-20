import { loginController, registerController } from '@/controllers/users.controller'
import { registerValidator, signinValidator } from '@/middlewares/users.middleware'
import { wrapAsync } from '@/utils/helpers'
import { Request, Response, Router } from 'express'
import { matchedData, query, validationResult } from 'express-validator'

const router = Router()

router.get('/', query('name').notEmpty().withMessage('Name k dc bo trong!').escape(), (req: Request, res: Response) => {
  const rs = validationResult(req)
  if (rs.isEmpty()) {
    const data = matchedData(req)
    console.log(data)
    return res.send({ data: `Home Page: ${req.query.name}` })
  }
  res.send({
    errors: rs.array()
  })
})
router.post('/login', signinValidator, loginController)
router.post('/register', registerValidator, wrapAsync(registerController))

export default router
