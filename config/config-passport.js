const passport = require('passport')
const passportJWT = require('passport-jwt')
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')

const User = require('../models/schemas/user')
const secret = require('./config.json').secret

const ExtractJWT = passportJWT.ExtractJwt
const Strategy = passportJWT.Strategy
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
}

// LocalStrategy
passport.use(
  new LocalStrategy({ usernameField: 'email'}, function(email, password, done) {
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            return done(null, false)
          }
          if (!user.validPassword(password)) {
            return done(null, false)
          }
          return done(null, user)
        })
        .catch((err) => done(err))
    },
  ),
)

// JWT Strategy
passport.use(
  new Strategy(params, function(payload, done) {
    console.log(payload);
    User.find({ id: payload.id })
      .then((user) => {
        if (!user) {
          console.log('Unauthorized')
          return done(new Error('User not found'))
        }
        return done(null, { id: user.id })
      })
      .catch((err) => done(err))
  }),
)
