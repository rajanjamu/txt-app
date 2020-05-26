const path      = require('path')
      express   = require('express'),
      mongoose  = require('mongoose'),
      fs        = require('fs'),
      multer    = require('multer'),
      flash     = require('connect-flash'),
      session   = require('express-session'),
      app       = express()

// Import Routes and Models
const indexRoutes   = require('./routes/index')

// App Variables
require('dotenv').config()
const upload    = multer({ dest: 'uploads/' })
const port      = process.env.PORT || 3000

// DB Initialization
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/txt_app', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
 })

// App Config
app.set('view engine', 'ejs')
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: 'inbound',
    resave: false,
    saveUninitialized: false
}))
app.use(flash())

// Flash Alert
app.use((req, res, next) => {
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success')
    next()
})

// Routes
app.use(indexRoutes)

// No Match Route
app.use((req, res, next) => {
    res.status(404).send({
        status: 404,
        error: 'Not found!'
    })
})

// Server
app.listen(port, () => {
    console.log('Server is running on port ' + port)
})