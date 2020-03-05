import * as R from 'ramda'

import User from '../models/User'

const create = (req, res, next) => {
  const user = User(req.body)

  user.save((err, result) => {
    if (err) {
      return res.status(400).send({
        error: err.message
      })
    }

    const {
      _id,
      name,
      email
    } = result

    res.status(201).send({ _id, name, email })
  })
}

const read = (req, res) => {
  const {
    _id,
    name,
    email
  } = req.profile
  res.status(200).send({ _id, name, email })
}

const update = (req, res, next) => {
  const condition = {
    _id: req.body._id
  }
  const update = req.body
  const options = { lean: true, new: true }

  User.findOneAndUpdate(condition, update, options, (err, updatedObject) => {
    if (err) {
      return res.status(400).send({ error: err })
    }

    res.status(200).send(updatedObject)
  })
}

const remove = (req, res, next) => {
  const condition = {
    _id: req.body._id
  }

  User.deleteOne(condition, err => {
    if (err) {
      return res.status(400).send({ error: err })
    }

    res.status(200).send()
  })
}

const userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || R.isEmpty(user)) {
      return res.status(400).send({ error: 'User not found' })
    }

    req.profile = user
    next()
  })
}

export default { create, read, update, remove, userById }
