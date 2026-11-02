import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addNumber = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    const duplicate = persons.find(person => person.name === newName)
    if (duplicate) {
      if (window.confirm(`${duplicate.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(duplicate.id, nameObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== duplicate.id ? person : returnedPerson))
            setMessage(
              `Modified ${duplicate.name}`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `Information of ${duplicate.name} has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== duplicate.id))
          })
      }
      setNewName('')
      setNewNumber('')

      return
    }
    personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(
          `Added ${nameObject.name}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const deletePerson = id => {
    const deleted = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${deleted.name} ?`)) {
      personService
        .deletePerson(id)
        .then(returnedPerson => {
          setPersons(persons.filter(p => p.id !== id))
          console.log(returnedPerson)
        })
    }
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Error message={errorMessage} />

      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addNumber={addNumber} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>


      <ul>
        {filteredPersons.map(person => (
          <Persons key={person.id} person={person}
            deletePerson={() => deletePerson(person.id)} />
        ))}
      </ul>
    </div>
  )
}

export default App