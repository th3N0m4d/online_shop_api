import fashiop from './fashiop'

const port = process.env.PORT

fashiop.listen(port, () => console.log(`Server is running on port ${port}`))
