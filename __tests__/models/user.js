import User from '../../models/User'

describe('Models', () => {
  describe('User', () => {
    it.each`
        name                  | value
        ${'name'}             | ${null}
        ${'email'}            | ${null}
    `('should have validation error for property "$name"',
      async ({ name, value }) => {
        const user = new User({ [name]: value })

        await user.validate(err => {
          expect(err.errors).toHaveProperty(name)
        })
      })

    it.each`
      name                  | value
      ${'name'}             | ${'John Doe'}
      ${'email'}            | ${'john.d@email.com'}
      ${'password'}         | ${'123456'}
  `('should not have validation error for property "$name"',
      async ({ name, value }) => {
        const user = new User({ [name]: value })

        await user.validate(err => {
          expect(err.errors).not.toHaveProperty(name)
        })
      })

    it('should return true for valid password', () => {
      const user = new User({ password: '1234' })
      const authenticateSpy = jest.spyOn(user, 'authenticate')

      user.authenticate('1234')

      expect(authenticateSpy).toReturnWith(true)
    })

    it('should return false for invalid password', () => {
      const user = new User({ password: '1234' })
      const authenticateSpy = jest.spyOn(user, 'authenticate')

      user.authenticate('abcd')

      expect(authenticateSpy).toReturnWith(false)
    })

    it('should generate random salt', () => {
      const user = new User()
      const makeSaltSpy = jest.spyOn(user, 'makeSalt')

      user.makeSalt()

      expect(makeSaltSpy).toReturn()
    })

    it('should encrypt password', () => {
      const user = new User()
      const encryptedPasswordSpy = jest.spyOn(user, 'encryptedPassword')

      user.encryptedPassword('1234')

      expect(encryptedPasswordSpy).toHaveBeenCalledWith('1234')
      expect(encryptedPasswordSpy).toReturn()
    })

    it('should not encrypt empty password', () => {
      const user = new User()
      const encryptedPasswordSpy = jest.spyOn(user, 'encryptedPassword')

      user.encryptedPassword('')

      expect(encryptedPasswordSpy).toReturnWith('')
    })
  })
})
