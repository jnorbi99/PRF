const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const todoModel = mongoose.model('todo')

router
  .route('/todo')
  .get((req, res, next) => {
    const { user } = req.query

    if (user) {
      todoModel.find({ user: user }, (error, todos) => {
        if (error) return res.status(500).send('Database error')
        if (todos.length) {
          return res.status(200).send(todos)
        } else {
          return res.status(204).send('You dont have any Todos')
        }
      })
    } else {
      return res.status(400).send('Bad request')
    }
  })
  .post((req, res, next) => {
    const { name, description, user } = req.body

    if (name && description && user) {
      todoModel.findOne({ user: user, name: name }, (error, todo) => {
        if (error) return res.status(500).send('Database error')
        if (todo) {
          res.status(400).send('You have this Todo already')
        } else {
          const newTodo = new todoModel({
            name: name,
            description: description,
            user: user,
          })

          newTodo.save((savingError) => {
            if (savingError)
              return res
                .status(500)
                .send('There was a problem saving your Todo')
            return res.status(200).send('Save was successfull')
          })
        }
      })
    }
  })
  .put((req, res, next) => {
    const { user, name, description } = req.body

    if (user && name && description) {
      todoModel.findOne({ user: user, name: name }, (error, todo) => {
        if (error) return res.status(500).send('Database error')
        if (todo) {
          todo.description = description
          todo.save((updatingError) => {
            if (updatingError)
              return res
                .status(500)
                .send('There was a problem updating your Todo')
            return res.status(200).send('Update was successfull')
          })
        } else {
          return res.status(400).send('You dont have Todo with this name')
        }
      })
    } else {
      return res.status(400).send('Bad request')
    }
  })
  .delete((req, res, next) => {
    const { user, name } = req.body

    if (user && name) {
      todoModel.findOne({ user: user, name: name }, (error, todo) => {
        if (error) return res.status(500).send('Database error')
        if (todo) {
          todo.delete((deletingError) => {
            if (deletingError)
              return res
                .status(500)
                .send('There was a problem deleting your Todo')
            return res.status(200).send('Delete was successfull')
          })
        } else {
          return res.status(400).send('You dont have Todo with this name')
        }
      })
    } else {
      return res.status(400).send('Bad request')
    }
  })

module.exports = router
