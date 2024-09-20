import { Router } from 'express'
import accessRouter from './access'
import { checkApiKey, checkPermission } from '@/auth/checkAuth'

const router = Router()

// check api key
router.use(checkApiKey)
// check permission
router.use(checkPermission('0000'))

router.use('/v1/api', accessRouter)

export default router
