import { ERole } from '@/constants/enum'
import { Shop } from '@/models/shop.model'
import bcrypt from 'bcryptjs'
import forge from 'node-forge'
import KeyTokenService from './keyToken.service'
import { createTokenPair } from '@/auth/authUtils'
import { pickFields } from '@/utils'
import { ConflictError } from '@/core/error.reponse'

const salt = bcrypt.genSaltSync(10)
const getHashPassword = (password: string) => {
  return bcrypt.hashSync(password, salt)
}

class AccessService {
  public static async signup({ name, email, password }: { name: string; email: string; password: string }) {
    const holderShop = await Shop.findOne({ email }).lean()
    if (holderShop) {
      throw new ConflictError('Email already exists')
    }
    const hashedPassword = await getHashPassword(password)

    const newShop = await Shop.create({
      name,
      email,
      password: hashedPassword,
      role: ERole.USER
    })

    if (newShop) {
      const { privateKey, publicKey } = forge.pki.rsa.generateKeyPair({ bits: 2048 })
      const privateKeyPem = forge.pki.privateKeyToPem(privateKey)
      const publicKeyPem = forge.pki.publicKeyToPem(publicKey)
      // console.log('privateKeyPem', privateKeyPem)
      // console.log('publicKeyPem', publicKeyPem)

      const publicKeyString = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey: publicKeyPem
      })

      if (!publicKeyString) {
        return {
          code: 400,
          message: 'Create key token failed'
        }
      }

      const tokens = await createTokenPair(
        {
          payload: newShop._id,
          email
        },
        privateKeyPem,
        publicKeyString
      )
      console.log('tokens::', tokens)

      return {
        code: 201,
        metadata: {
          shop: pickFields(['id', 'name', 'email'], newShop),
          tokens
        }
      }
    }

    return {
      code: 201,
      metadata: null
    }
  }
}

export default AccessService
