import express from 'express'
import controller from '../controllers/user'

const router = express.Router()

router.route('/')
  .post(controller.create)

router.route('/:id')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.remove)

router.param('id', controller.userById)

export default router
