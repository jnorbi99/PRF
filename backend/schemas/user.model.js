const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    accessLevel: { type: String },
  },
  { collection: 'users' }
)

userSchema.pre('save', function (next) {
  const user = this

  if (user.isModified('password')) {
    user.accessLevel = 'basic'
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) return next(saltError)

      bcrypt.hash(user.password, salt, function (hashError, hash) {
        if (hashError) return next(hashError)

        user.password = hash
        return next()
      })
    })
  } else {
  }
})

userSchema.methods.comparePasswords = function (password, next) {
  bcrypt.compare(password, this.password, function (compareError, isMatch) {
    next(compareError, isMatch)
  })
}

mongoose.model('user', userSchema)
