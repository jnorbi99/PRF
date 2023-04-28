const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const userModel = mongoose.model('user')
const todoModel = mongoose.model('todo')
const passport = require('passport')

router.route('/login').post((req, res, next) => {
  const { username, password } = req.body

  if (username && password) {
    passport.authenticate('local', (error, user) => {
      if (error) return res.status(500).send(error)
      req.logIn(user, (loginError) => {
        if (loginError) return res.status(500).send(loginError)
      })
      session = req.session
      session.userid = username
      return res.status(200).send('Login successfull')
    })(req, res, next)
  } else {
    return res.status(400).send('Bad request')
  }
})

router.route('/logout').post((req, res, next) => {
  if (!req.isAuthenticated()) {
    req.logout((logoutError) => {
      if (logoutError)
        return res.status(400).send('There was a problem logging you out')
    })
    return res.status(200).send('Logout successfull')
  } else {
    return res.status(403).send('You are not logged in')
  }
})

//User post
router.route('/register').post((req, res, next) => {
  const { username, password, email } = req.body

  if (username && password && email) {
    userModel.findOne({ username: username }, (error, user) => {
      if (error) return res.status(500).send('Database error')
      if (user) return res.status(400).send('This user is already exist')

      const newUser = new userModel({
        username: username,
        password: password,
        email: email,
      })

      newUser.save((savingError) => {
        if (savingError)
          return res
            .status(500)
            .send('There was a problem registering your account')
        return res.status(200).send('Registration was successfull')
      })
    })
  } else {
    return res.status(400).send('Bad request')
  }
})

//User get, put, delete
router
  .route('/user')
  .get((req, res, next) => {
    userModel.find({}, (error, users) => {
      if (error) return res.status(500).send('Database error')
      if (users.length >= 0) {
        const u = []
        for (let i in users) {
          if (users[i].username !== 'admin') {
            u.push(users[i])
          }
        }
        return res.status(200).send(u)
      } else {
        return res.status(400).send('You dont have account')
      }
    })
  })
  .put((req, res, next) => {
    const { username, password } = req.body

    if (username && password) {
      userModel.findOne({ username: username }, (error, user) => {
        if (error) return res.status(500).send('Database error')
        if (user) {
          user.password = password
          user.save((updatingError) => {
            if (updatingError)
              return res
                .status(500)
                .send('There was a problem updating your password')
            return res.status(200).send('Update was successfull')
          })
        } else {
          return res.status(400).send('You dont have account')
        }
      })
    } else {
      return res.status(400).send('Bad request')
    }
  })
  .delete((req, res, next) => {
    const { username } = req.body

    if (username) {
      userModel.findOne({ username: username }, (error, user) => {
        if (error) return res.status(500).send('Database error')
        if (user) {
          todoModel.find({ user: username }, (error, todos) => {
            if (error) return res.status(500).send('Database error')
            if (todos.length) {
              todos.forEach((todo) => {
                todo.delete()
              })
            }
          })

          user.delete((deletingError) => {
            if (deletingError)
              return res
                .status(500)
                .send('There was a problem deleting your account')
            return res.status(200).send('Delete was successfull')
          })
        } else {
          return res.status(400).send('You dont have account')
        }
      })
    } else {
      return res.status(400).send('Bad request')
    }
  })

module.exports = router
