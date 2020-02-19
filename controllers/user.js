import User from '../models/User'

const create = (req, res, next) => {
  const user = User(req.body)

  user.save((err, result) => {
    if (err) {
      res.status(400).send({
        error: err.message
      })
    }

    res.status(201).send(result)
  })
}

const list = (req, res) => {}

const read = (req, res) => {}

const update = (req, res, next) => { }

const remove = (req, res, next) => { }

const userById = (req, res, next, id) => {}

export default { create, read, update, remove, list, userById }
