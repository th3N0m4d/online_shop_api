import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import userRoutes from './routes/user'

dotenv.config()

const app = express()
const uri = process.env.ATLAS_URI

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const connection = mongoose.connection

connection.once('open', () => {
  console.info('MongoDB database connection established successfully')
})

app.use(express.json())

app.use('/api/user', userRoutes)

export default app
