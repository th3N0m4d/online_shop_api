import dotenv from 'dotenv'
import mongoose from 'mongoose'

import fashiop from './fashiop'

dotenv.config()

const uri = process.env.ATLAS_URI

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const connection = mongoose.connection

connection.once('open', () => {
  console.info('MongoDB database connection established successfully')
})

const port = process.env.PORT

fashiop.listen(port, () => console.info(`Server is running on port ${port}`))
