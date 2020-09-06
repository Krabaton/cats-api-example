const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const secret = require('../../../config/config.json').secret
const { validDateOfUser } = require('../../../validation')

router.post('/', validDateOfUser, (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.status(400).json({
        statusMessage: 'Error',
        data: {
          message: 'Incorrect login or password',
          status: 400,
        },
      })
    }
    if (user) {
      const payload = {
        id: user.id,
        spec: 123,
      }
      const token = jwt.sign(payload, secret)
      res.json({
        statusMessage: 'Ok',
        data: {
          token: token,
        },
      })
    }
  })(req, res, next)
})

module.exports = router
