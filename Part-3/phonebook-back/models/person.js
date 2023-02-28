require('dotenv').config()

const mongoose = require('mongoose')

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(() => {
    console.log('Success')
  })
  .catch(error => {
    console.log('ERROR! MongoDB not conected', error.message)
  })

const personSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: (v) => /\d{3}-\d{0}/.test(v) || /\d{2}-\d{0}/.test(v)
    },
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedPerson) => {
    returnedPerson.id = returnedPerson._id.toString();
    delete returnedPerson._id;
    delete returnedPerson.__v;
  } })

module.exports = mongoose.model('Person', personSchema)