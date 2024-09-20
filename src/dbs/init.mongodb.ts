import { config } from 'dotenv'
import mongoose from 'mongoose'

config()
const URI = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@fabbi.0y522zf.mongodb.net/?retryWrites=true&w=majority`

class Database {
  private static instance: Database

  private constructor() {
    this.connect()
  }

  private async connect(): Promise<void> {
    try {
      if (process.env.ENV === 'development') {
        mongoose.set('debug', true)
        mongoose.set('debug', { color: true })
      }
      console.log(process.env.DATABASE_NAME)

      await mongoose.connect(URI, {
        // Add any additional connection options here
        dbName: process.env.DATABASE_NAME,
        maxPoolSize: 50,
        serverSelectionTimeoutMS: 10 * 1000
      })

      console.log('Connected to MongoDB successfully')

      mongoose.connection.on('error', (error) => {
        console.error('MongoDB connection error:', error)
      })

      mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected. Attempting to reconnect...')
        this.connect()
      })
    } catch (error) {
      console.error('Error connecting to MongoDB:', error)
      // Optionally, you can add a retry mechanism here
    }
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }
}

const instance = Database.getInstance()
export default instance
