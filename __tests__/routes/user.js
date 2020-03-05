import request from 'supertest'

import fashiop from '../../fashiop'
import dbHandler from '../../helpers/dbHandler'

describe('Routes', () => {
  beforeAll(async () => dbHandler.connect())

  afterEach(async () => dbHandler.clearDatabase())

  afterAll(async () => dbHandler.closeDatabase())

  const user = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    password: '123456'
  }

  describe('User', () => {
    it('should create new user', async () => {
      const res = await createUser(fashiop)

      expect(res.statusCode).toBe(201)
      expect(res.body).toHaveProperty('_id')
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('email')
    })

    it('should retrieve existing user by id', async () => {
      const { body: user } = await createUser(fashiop)

      const res = await request(fashiop)
        .get(`/api/user/${user._id}`)

      expect(res.statusCode).toBe(200)
      expect(res.body).toHaveProperty('_id')
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('email')
    })

    it('should update user by id', async () => {
      const { body: user } = await createUser(fashiop)
      const userToUpdate = {
        ...user,
        name: 'Peter Pan'
      }

      const res = await request(fashiop)
        .put(`/api/user/${user._id}`)
        .send(userToUpdate)

      expect(res.statusCode).toBe(200)
      expect(res.body).toHaveProperty('_id')
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('email')
    })

    it('should delete user by id', async () => {
      const { body: user } = await createUser(fashiop)

      const res = await request(fashiop)
        .delete(`/api/user/${user._id}`)

      expect(res.statusCode).toBe(200)
      expect(res.body).toHaveProperty('_id')
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('email')
    })
  })

  const createUser = async app => {
    return request(fashiop)
      .post('/api/user')
      .send(user)
  }
})
