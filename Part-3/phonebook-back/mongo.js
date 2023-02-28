const mongoose = require('mongoose')

if(process.argv.length < 3){
  console.log('Please insert the password')
  process.exit(1)
}

const password = process.argv[2]


const url =
    `mongodb+srv://geffersonteodoro:${password}@cluster0.0qsvdoo.mongodb.net/phonebookData?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema);


if(process.argv.length === 3){
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}



const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})


if(process.argv.length === 4){
  person.save().then( () => {
    console.log('person saved')
    console.log(`Added ${person} to phonebook`)
    mongoose.connection.close()
  })
}
