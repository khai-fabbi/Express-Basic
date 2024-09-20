import jwt, { SignOptions } from 'jsonwebtoken'
import { config } from 'dotenv'

config()
interface ISignInToken {
  payload: string | object | Buffer
  privateKey?: string
  options?: SignOptions
}
export const SigninToken = ({
  payload,
  privateKey = process.env.JWT_SECRET as string,
  options = { algorithm: 'HS256', expiresIn: 15 }
}: ISignInToken) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (err, token) => {
      if (err) throw reject(err)
      resolve(token as string)
    })
  })
}
