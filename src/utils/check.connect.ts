import mongoose from 'mongoose'
import os from 'os'

const TICK_TIME = 60 * 1000
export const checkOverLoad = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length
    const numCores = os.cpus().length
    const memoryUsage = process.memoryUsage().rss

    const maxConnections = numCores * 5
    console.log(`Active connections: ${numConnection}`)
    console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`)

    if (numConnection > maxConnections) {
      console.log('Connection overload detected')
    }
  }, TICK_TIME)
}
