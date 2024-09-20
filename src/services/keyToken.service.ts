import keyTokenModel from '@/models/keyToken.model'

class KeyTokenService {
  public static createKeyToken = async ({ userId, publicKey }: any): Promise<string | null> => {
    try {
      const publicKeyString = publicKey.toString()
      const tokens = await keyTokenModel.create({
        user: userId,
        publicKey: publicKeyString
      })
      return tokens ? tokens.publicKey : null
    } catch (error) {
      return null
    }
  }
}

export default KeyTokenService
