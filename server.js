import fashiop from './fashiop'

const port = process.env.PORT

fashiop.listen(port, () => console.info(`Server is running on port ${port}`))
