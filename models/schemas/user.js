const mongoose = require('mongoose')
const bCrypt = require('bcryptjs')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true,
  },
  hash: {
    type: String,
    required: [true, 'Password required'],
  },
})

userSchema.methods.setPassword = function (password) {
  this.hash = bCrypt.hashSync(password, bCrypt.genSaltSync(6), null)
}

userSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.hash)
}

const User = mongoose.model('user', userSchema)

module.exports = User
