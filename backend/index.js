const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const expressSession = require('express-session')
const localStrategy = require('passport-local').Strategy
const cors = require('cors')
const path = require('path')

const app = express()
const secret = 'valamitideirokdeeznemlatszik'
const dbURL =
  'mongodb+srv://admin:admin@prf-backend.5svc4iu.mongodb.net/?retryWrites=true&w=majority'

//Database connection
mongoose.connect(dbURL)
mongoose.connection.on('connected', () => {
  console.log('Database Connected')
})
mongoose.connection.on('error', () => {
  console.log('Error establishing a Database Connection')
})

//Get schemas and model
require('./schemas/user.model')
require('./schemas/todo.model')
const userModel = mongoose.model('user')

const whiteList = ['*']
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || whiteList.includes('*')) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}

//Middlewares
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({}))
app.use(cookieParser())
app.use(
  expressSession({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
)
app.use(passport.initialize())
app.use(passport.session())

//Local strategy
passport.use(
  'local',
  new localStrategy((username, password, done) => {
    userModel.findOne({ username: username }, (error, user) => {
      if (error) return done('Session error', null)
      if (!user) return done('This user is not exist', null)

      user.comparePasswords(password, (compareError, isMatch) => {
        if (compareError) return done(compareError, false)
        if (!isMatch) return done('Invalid password', false)
        return done(null, user)
      })
    })
  })
)

passport.serializeUser((user, done) => {
  process.nextTick(() => done(null, user))
})

passport.deserializeUser((user, done) => {
  process.nextTick(() => done(null, user))
})

//Custom routes
app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))

app.use('/', require('./routes/user.route'))
app.use('/', require('./routes/todo.route'))

//Default route
app.use((req, res, next) => {
  res.status(404).send('The requested resource is not available')
})

app.listen(3000, () => {
  console.log('The server is running')
})
