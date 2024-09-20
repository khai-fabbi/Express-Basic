import mongoose from 'mongoose'

const COLLECTION_NAME = 'apiKeys'
const DOCUMENT_NAME = 'ApiKey'
// Declare the Schema of the Mongo model
const apiKeySchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true
    },
    status: {
      type: Boolean,
      default: true
    },
    permission: {
      type: [String],
      enum: ['0000', '1111', '2222'],
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      expires: '30d'
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

//Export the model
export default mongoose.model(DOCUMENT_NAME, apiKeySchema)
