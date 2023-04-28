const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: String, required: true },
  },
  { collection: 'todos' }
)

mongoose.model('todo', userSchema)
