const express   = require('express'),
      router    = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/login', (req, res) => {
    res.render('user/login')
})

router.get('/register', (req, res) => {
    res.render('user/register')
})

module.exports = router