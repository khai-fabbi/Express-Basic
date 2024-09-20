import AccessController from '@/controllers/access.controller'
import { wrapAsync } from '@/utils/helpers'
import { Router } from 'express'

const router = Router()

router.post('/signup', wrapAsync(AccessController.signup))

export default router
