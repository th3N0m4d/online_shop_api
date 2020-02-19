import User from '../../models/User'

describe('Models', () => {
  describe('User', () => {
    it.each`
        name                  | value
        ${'name'}             | ${null}
        ${'email'}            | ${null}
        ${'hashed_password'}  | ${null}
    `('should have validation error for property "$name"',
      async ({ name, value }) => {
        const user = new User({ [name]: value })

        user.validate(err => {
          expect(err.errors).toHaveProperty(name)
        })
      })

    it.each`
      name                  | value
      ${'name'}             | ${'John Doe'}
      ${'email'}            | ${'john.d@email.com'}
      ${'hashed_password'}  | ${'1234'}
  `('should not have validation error for property "$name"',
      async ({ name, value }) => {
        const user = new User({ [name]: value })

        user.validate(err => {
          expect(err.errors).not.toHaveProperty(name)
        })
      })
  })
})
