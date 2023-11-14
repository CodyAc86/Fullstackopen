const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(express.static('dist'))
app.use(cors())
morgan.token('body', (request) => JSON.stringify(request.body))
app.use(morgan('tiny'))
app.use(express.json())

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]
const generateId = () => {
    const maxId = persons.length > 0 
        ? Math.max(...persons.map(p => p.id)) : 0
    return maxId + 1
}


app.get('/info', (request, response) => {
    const personsCount = Number(persons.length)
    const info = `Phonebook has info for ${personsCount} people`
    const date = new Date()
    response.send(
    `<p>${info}</p> ${date}`
    )
})
app.get('/api/persons', (request, response) =>{
    response.json(persons)
})
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        response.json(person)
    }
    else {
        response.status(404).end()
    }
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})


const postMorgan = morgan(':method :url :status :res[content-length] - :response-time ms :body')
app.post('/api/persons', postMorgan, (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({error: 'name or number is missing'})
    }
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number        
    }
    const existingPerson = persons.find(
        (props) => props.name.toLowerCase() === body.name.toLowerCase())
    if (existingPerson){
        return response.status(400).json({error: 'name must be unique'})
    }

    persons = persons.concat(person)
    console.log(person)
    response.json(person)
})

app.put('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    
    const newPerson = request.body
	const existingPerson = persons.find(
        (props) => props.name.toLowerCase() === newPerson.name.toLowerCase())
    if (existingPerson){
        persons = persons.map(n => n.id !== existingPerson.id ? n : newPerson)
        response.json(newPerson)
    }
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})