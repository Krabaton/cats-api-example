const Joi = require('joi')

module.exports.validDateOfCat = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    age: Joi.number()
      .integer()
      .min(1)
      .max(45)
      .required(),
  })

  const { error } = Joi.validate(req.body, schema)
  if (error) {
    const message = error.details.map((el) => el.message).join('; ')

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
  const schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .max(1200)
      .required(),
  })
  const { error } = Joi.validate(req.body, schema)
  if (error) {
    const message = error.details.map((el) => el.message).join('; ')

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
