const express = require('express')
const router = express.Router()
const db = require('../../../models/db')
const passport = require('passport')
const auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (!user || err) {
      console.log(info.message)
      res.status(401).json({
        statusMessage: 'Error',
        data: { status: 401, message: 'Unauthorized' },
      })
    } else {
      next()
    }
  })(req, res, next)
}

const { validDateOfCat } = require('../../../validation')

router.get('/', function(req, res) {
  db.gets(req.query)
    .then((results) => {
      res.json({ statusMessage: 'Ok', data: results })
    })
    .catch((err) => {
      res.status(400).json({
        statusMessage: 'Error',
        data: { status: 400, message: err.message },
      })
    })
})

router.get('/:id', function(req, res) {
  db.getById(req.params.id)
    .then((results) => {
      if (results) {
        res.json({ statusMessage: 'Ok', data: results })
      } else {
        res.status(404).json({
          statusMessage: 'Error',
          data: { status: 404, message: 'Cat not found' },
        })
      }
    })
    .catch((err) => {
      res.status(400).json({
        statusMessage: 'Error',
        data: { status: 400, message: err.message },
      })
    })
})

router.post('/', auth, validDateOfCat, function(req, res) {
  db.add(req.body)
    .then((results) => {
      res.header(
        'Location',
        `http://localhost:3000/api/cats/${results._id}`,
      )
      res.status(201).json({ statusMessage: 'Ok', data: results })
    })
    .catch((err) => {
      res.status(400).json({
        statusMessage: 'Error',
        data: { status: 400, message: err.message },
      })
    })
})

router.put('/:id', auth, validDateOfCat, function(req, res) {
  db.update(req.body, req.params.id)
    .then((results) => {
      if (results) {
        res.json({ statusMessage: 'Ok', data: results })
      } else {
        res.status(404).json({
          statusMessage: 'Error',
          data: { status: 404, message: 'Cat not found' },
        })
      }
    })
    .catch((err) => {
      res.status(400).json({
        statusMessage: 'Error',
        data: { status: 400, message: err.message },
      })
    })
})

router.delete('/:id', auth, function(req, res) {
  db.delete(req.params.id)
    .then((results) => {
      if (results) {
        res.json({ statusMessage: 'Ok', data: results })
      } else {
        res.status(404).json({
          statusMessage: 'Error',
          data: { status: 404, message: 'Cat not found' },
        })
      }
    })
    .catch((err) => {
      res.status(400).json({
        statusMessage: 'Error',
        data: { status: 400, message: err.message },
      })
    })
})

module.exports = router
