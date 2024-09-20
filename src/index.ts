import compression from 'compression'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express, NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { defaultErrorHandler } from './middlewares/errors.middleware'
import instance from './dbs/init.mongodb'
// import { checkOverLoad } from './utils/check.connect'
import router from './routes'
import { HttpCode } from './constants/enum'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 8080

const allowedOrigins = ['http://localhost:3000']

const options: cors.CorsOptions = {
  origin: allowedOrigins
}
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(cors(options))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const cn = instance
// check overload
// checkOverLoad()
// config router
app.use('/', router)

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Not found')
  ;(error as any).status = HttpCode.NOT_FOUND
  next(error)
})
app.use(defaultErrorHandler)

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})

process.on('SIGINT', () => {
  console.log('Stop server')
})
