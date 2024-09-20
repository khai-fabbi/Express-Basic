import { ERole, EShopStatus } from '@/constants/enum'
import mongoose, { Schema } from 'mongoose'

const DOCUMENT_NAME = 'Shop'
const COLLECTION_NAME = 'Shops'

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: Object.values(EShopStatus),
      default: EShopStatus.ACTIVE
    },
    address: {
      type: String,
      default: ''
    },
    verify: {
      type: Schema.Types.Boolean,
      default: false
    },
    role: {
      type: Schema.Types.String,
      enum: Object.values(ERole),
      default: ERole.USER
    },
    description: {
      type: String
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

export const Shop = mongoose.model(DOCUMENT_NAME, shopSchema)
