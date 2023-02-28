require('dotenv').config()

const express = require("express")
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('dataperson', (request) => {
  return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :dataperson'))


app.get('/api/persons', (resquest, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))
})

app.get('/api/info', (request, response) => {
  const date = new Date()
  Person.countDocuments({}, (err, count) => {
    response.send(`<p>Phonebook has info for ${count} people <br/> ${date}</p>`)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findById(id)
    .then(person => person ? response.json(person) : response.status(404).end())
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      console.log(result)
      response.status(204).end()
    })
    .catch(error => next(error))

})

app.post('/api/persons' , (request, response, next) => {
  const body = request.body

  const person = new Person ({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  const id = request.params.id

  Person.findByIdAndUpdate(id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then(retornedPerson => {
      response.json(retornedPerson)
    })
    .catch(error => next(error))
})

const unknownEndingPoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endingpoint' })
}
app.use(unknownEndingPoint)

const errorHandler = (error, request, response, next) => {
  const errorStatus = error.status || 400


  if (error.errors['number']) {
    response.status(errorStatus).json({
      error: error.message,
      example: 'Ex: 123-12345678 or 12-12345678'
    })
    next(error)
  }


  response.status(errorStatus).send({ error : error.message })

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
