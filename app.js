const express = require('express')
const routerCats = require('./routes/api/cats')
const routerReg = require('./routes/api/registration')
const routerAuth = require('./routes/api/auth')
const app = express()
require('./models')

// parse application/json
app.use(express.json())
// cors
app.use(function (_, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )
  next()
})

require('./config/config-passport')

app.use('/api/reg', routerReg)
app.use('/api/auth', routerAuth)
app.use('/api/cats', routerCats)

app.use((_req, res, _next) => {
  res.status(404).json({
    statusMessage: 'Error',
    data: { status: 404, message: 'Use api on routes /api/cats' },
  })
})

app.use((err, _req, res, _next) => {
  console.log(err.stack)
  res.status(500).json({
    statusMessage: 'Error',
    data: { status: 500, message: err.message },
  })
})

const PORT = process.env.PORT || 3000

if (require.main === module) {
  app.listen(PORT, function () {
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
} else {
  module.exports = app
}
