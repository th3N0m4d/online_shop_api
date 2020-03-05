import * as R from 'ramda'

import User from '../models/User'
import { hideUserSensitiveProps } from '../helpers/user'

const create = (req, res, next) => {
  const user = User(req.body)

  user.save((err, result) => {
    if (err) {
      return res.status(400).send({
        error: err.message
      })
    }

    res.status(201).send(hideUserSensitiveProps(result))
  })
}

const read = (req, res) => {
  const user = req.profile
  res.status(200).send(hideUserSensitiveProps(user))
}

const update = (req, res, next) => {
  const condition = {
    _id: req.profile._id
  }
  const update = req.body
  const options = { lean: true, new: true }

  User.findOneAndUpdate(condition, update, options, (err, doc) => {
    if (err) {
      return res.status(400).send({ error: err })
    }

    res.status(200).send(hideUserSensitiveProps(doc))
  })
}

const remove = (req, res, next) => {
  const {
    _id
  } = req.profile

  User.findByIdAndDelete(_id, (err, doc) => {
    if (err) {
      return res.status(400).send({ error: err })
    }

    res.status(200).send(hideUserSensitiveProps(doc))
  })
}

const userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || R.isEmpty(user)) {
      return res.status(400).send({ error: 'User not found' })
    }

    req.profile = hideUserSensitiveProps(user)
    next()
  })
}

export default { create, read, update, remove, userById }
