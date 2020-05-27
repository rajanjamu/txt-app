const path          = require('path')
      express       = require('express'),
      mongoose      = require('mongoose'),
      bodyParser    = require('body-parser'),
      methodOverride= require('method-override'),
      session       = require('express-session'),
      flash         = require('connect-flash'),
      fs            = require('fs'),
      multer        = require('multer'),
      passport      = require('passport'),
      LocalStrategy = require('passport-local')
      app           = express()

// Import Routes and Models
const indexRoutes   = require('./routes/index')
const User          = require('./models/user')

// App Variables
require('dotenv').config()
const upload    = multer({ dest: '/uploads/' })
const port      = process.env.PORT || 3000

// Paths for Express Config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath     = path.join(__dirname, '../templates/views')

// DB Initialization
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/txt_app', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
 })

// App Config
app.set('view engine', 'ejs')
app.set('views', viewsPath)
app.use(express.static(publicDirPath))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(flash())
app.use(session({
    secret: 'txtApp',
    resave: false,
    saveUninitialized: false
}))

// Passport Config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash Alert
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

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