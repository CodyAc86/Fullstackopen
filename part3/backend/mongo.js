const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://phonebook:${password}@exercises.glfgugj.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number  
})

if (process.argv.length===3){
    console.log('phonebook: ')
    Person.find({}).then(persons=>{
        persons.forEach(person =>{
            console.log(person.name, person.number)
        mongoose.connection.close()
        })
    })
    
}
else {
    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
    })
}