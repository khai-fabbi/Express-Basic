import { config } from 'dotenv'
import jwt from 'jsonwebtoken'

config()

export const createTokenPair = async (payload: string | object | Buffer, privateKey: string, publicKey?: string) => {
  try {
    const accessToken = await jwt.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as string
    })

    const refreshToken = await jwt.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as string
    })

    // Step 3: Verify the JWT using the public key
    jwt.verify(accessToken, publicKey as string, { algorithms: ['RS256'] }, (err, decoded) => {
      if (err) {
        console.log('Verification failed:', err.message)
      } else {
        console.log('Decoded JWT:', decoded)
      }
    })

    return { accessToken, refreshToken }
  } catch (error) {
    return {
      code: 500,
      message: 'Internal server error',
      status: 'error'
    }
  }
}
