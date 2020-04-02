const mongoose = require('mongoose')
const Cats = require('./schemas/cats')

module.exports.gets = async (query) => {
  const limit = parseInt(query.limit || 10)
  const skip = parseInt(query.skip || 0)
  const count = await Cats.find()
    .countDocuments()
    .skip(skip)
    .limit(limit)
  const cats = await Cats.find()
    .skip(skip)
    .limit(limit)
  return { count, cats }
}

module.exports.getById = function(paramsId) {
  return Cats.findOne({ _id: paramsId })
}

module.exports.add = function(data) {
  const Cat = new Cats({
    name: data.name,
    age: parseInt(data.age),
  })

  return Cat.save()
}

module.exports.update = function(data, paramsId) {
  const Cat = {
    name: data.name,
    age: parseInt(data.age),
  }

  return Cats.findByIdAndUpdate(
    {
      _id: paramsId,
    },
    {
      $set: Cat,
    },
    { new: true },
  )
}

module.exports.delete = function(paramsId) {
  return Cats.findByIdAndRemove({ _id: paramsId })
}
