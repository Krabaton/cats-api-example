const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Укажите имя кота'],
      unique: true,
    },
    age: {
      type: Number,
    },
  },
  { versionKey: false }
);

const Cat = mongoose.model('cat', catSchema);

module.exports = Cat;
