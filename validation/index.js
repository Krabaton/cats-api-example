const Joi = require('joi')

module.exports.validDateOfCat = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    age: Joi.number().integer().min(1).max(45).required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    const [{ message }] = error.details
    return res.status(400).json({
      statusMessage: 'Error',
      data: {
        message,
        status: 400,
      },
    })
  }
  next()
}

module.exports.validDateOfUser = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(12).required(),
  })

  const { error } = schema.validate(req.body)

  if (error) {
    const [{ message }] = error.details
    return res.status(400).json({
      statusMessage: 'Error',
      data: {
        message,
        status: 400,
      },
    })
  }
  next()
}
