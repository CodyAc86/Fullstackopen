import React, { useEffect, useState } from "react"
import Filter from "./components/Filter"
import Alert from "./components/Alert"
import PhonebookForm from "./components/PhonebookForm"
import Persons from "./components/Persons"
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")  
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [filter, setFilter] = useState("")
  const delay = 4000

  useEffect(() => {
    personService
      .getAll()
      .then((allPersons) => {
        setPersons(allPersons)
      })
      .catch((error) => alert(error))
  }, [])

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!newName || !newNumber) {
      alert("Please fill in the fields")
      return
    }

    
    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )

    if (existingPerson && existingPerson.number === newNumber) {
      alert(`${newName} is already added to phonebook`)
      setNewName("")
      setNewNumber("")
      return
    }
    
    if (existingPerson && existingPerson.number !== newNumber) {
      if (
        window.confirm(
          `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        const id = existingPerson.id

        personService
          .update(id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) => (person.id !== id ? person : returnedPerson))
            )
            setSuccessMessage(`Updated ${updatedPerson.name}'s number`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, delay)
            setNewName("")
            setNewNumber("")
          })
          .catch((error) => {
            if (error.response.data) {
              setErrorMessage(error.response.data.error)
              setTimeout(() => {
                setErrorMessage(null)
              }, delay)
            } 
          })        
       }       
    }
    
    const newPerson = { name: newName, number: newNumber }
    personService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setSuccessMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
        setNewName("")
        setNewNumber("")
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, delay)
      })
  }

  const handleDelete = (id) => {
    if (window.confirm("Do you really want to delete this person")) {
      personService
        .remove(id)
        .then(() => {
          setSuccessMessage(`Deleted ${persons.find((person) => person.id === id).name}`)
          setPersons(persons.filter((person) => person.id !== id))
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000)
        })
        .catch((error) => setErrorMessage(
          `Information of ${persons.find((person) => person.id === id).name} has already been removed from server`
        ))
        setPersons(persons.filter((p) => p.id !== id))
        setNewName("")
        setNewNumber("")
        setTimeout(() => {
          setErrorMessage(null)
        }, delay)
    } else {
      return
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Alert successMessage={successMessage} errorMessage={errorMessage} />
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <PhonebookForm
        onFormSubmit={handleSubmit}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        nameValue={newName}
        numberValue={newNumber}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  )
}

export default App