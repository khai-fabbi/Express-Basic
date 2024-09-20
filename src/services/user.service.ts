import bcrypt from 'bcryptjs'
import databaseService from './database.service'
import User from '@/models/schemas/User.schema'
import { IRegisterReqBody } from '@/models/requests/User.requests'
import { SigninToken } from '@/utils/jwt'
import { TokenType } from '@/constants/enum'
const salt = bcrypt.genSaltSync(10)

const getHashPassword = (password: string) => {
  return bcrypt.hashSync(password, salt)
}

class UserService {
  // get access token
  private signAccessToken(userId: string) {
    return SigninToken({
      payload: {
        user_id: userId,
        token_type: TokenType.AccessToken
      },
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      }
    })
  }

  // get refresh token
  private signRefreshToken(userId: string) {
    return SigninToken({
      payload: {
        user_id: userId,
        token_type: TokenType.RefreshToken
      },
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
      }
    })
  }

  async register(payload: IRegisterReqBody) {
    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        password: getHashPassword(payload.password),
        date_of_birth: new Date(payload.date_of_birth)
      })
    )
    const userId = result.insertedId.toString()
    const [accessToken, refreshToken] = await Promise.all([this.signAccessToken(userId), this.signRefreshToken(userId)])
    return { accessToken, refreshToken }
  }
  async checkEmailExist(email: string) {
    const rs = await databaseService.users.findOne({ email })
    return !!rs
  }
}
const userService = new UserService()
export default userService
