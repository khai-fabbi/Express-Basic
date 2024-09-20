import apiKeyModel from '@/models/apiKey.model'
import forge from 'node-forge'

export const findApiKeyById = async (key: string) => {
  // fake api key
  // await apiKeyModel.create({
  //   key: forge.util.bytesToHex(forge.random.getBytesSync(16)),
  //   status: true,
  //   permission: ['0000', '1111', '2222']
  // })
  return await apiKeyModel.findOne({ key: key }).lean()
}
