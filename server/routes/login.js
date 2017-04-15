var express = require('express'),
    path = require('path'),
    router = express.Router(),
    api = require('../api'),
    tokenCreate = require('../token-mw/token-create'),
    sha1 = require('sha1'),
    dotenv = require('dotenv')

dotenv.load()

router.post('/login', (req, res) => {
  console.log('POST /api/login')
  var account = req.body.account,
      password = req.body.password
  // console.log(req.body)
  api.getAdminByAccount(account)
     .then((Admin) => {

     })
     .catch((err) => {
       
     })
})

module.exports = router