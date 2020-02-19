import mongoose from 'mongoose'
import crypto from 'crypto'
import * as R from 'ramda'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  hashed_password: {
    type: String,
    required: 'Password is required'
  },
  salt: String
})

UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptedPassword(plainText) === this.hashed_password
  },
  encryptedPassword: function (password) {
    if (R.isEmpty(password)) return ''

    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (error) {
      return ''
    }
  },
  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  }
}

UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptedPassword(password)
  })
  .get(function () {
    return this._password
  })

UserSchema.path('hashed_password').validate(function (v) {
}, null)

export default mongoose.model('User', UserSchema)
