import request from 'supertest'

import fashiop from '../../fashiop'
import dbHandler from '../../helpers/dbHandler'

describe('Controllers', () => {
  beforeAll(async () => dbHandler.connect())

  afterEach(async () => dbHandler.clearDatabase())

  afterAll(async () => dbHandler.closeDatabase())

  describe('User', () => {
    it.only('should create new user', async () => {
      const res = await request(fashiop)
        .post('/api/user')
        .send({
          name: 'John Doe',
          email: 'john.doe@email.com',
          password: '123456'
        })

      expect(res.statusCode).toBe(201)
      expect(res.body).toHaveProperty('_id')
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('email')
    })
  })
})
