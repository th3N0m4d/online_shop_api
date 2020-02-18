import request from 'supertest'
import fashiop from '../fashiop'

describe('Routes', () => {
  it('should return "Hello world" from "/" route', async () => {
    const res = await request(fashiop).get('/')

    expect(res.statusCode).toEqual(200)
    expect(res.body.message).toBe('Hello world!')
  })
})
