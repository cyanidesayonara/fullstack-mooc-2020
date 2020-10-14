import React, {
  useState,
  useEffect
} from 'react'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => setPersons(response))
      .catch(e => console.log(e))
  }, [])

  const showMessage = (message, error) => {
    setNotification(message)
    setError(error)

    setTimeout(() => {
      setNotification(null)
      setError(null)
    }, 5000)
  }

  const addPerson = event => {
    event.preventDefault()

    const person = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.find(p => p.name === newName)

    if (!existingPerson) {
      personService
        .create(person)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          showMessage(`Added ${person.name}`)
        })
        .catch(e => {
          showMessage(e.response.data.error.message, true)
        })
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(existingPerson.id, person)
          .then(response => {
            setPersons(persons
              .filter(p => p.name !== person.name)
              .concat(response)
            )
            setNewName('')
            setNewNumber('')
            showMessage(`Updated ${person.name}`)
          })
          .catch(e => {
            showMessage(e.response.data.error.message, true)
          })
      }
    }
  }

  const removePerson = (event, name) => {
    event.preventDefault()
    const person = persons.find(person => person.name === name)
    if (person) {
      if (window.confirm(`Delete ${person.name}`)) {
        personService
          .remove(person.id)
          .then(response => {
            setPersons(persons.filter(p => p.id !== person.id))
            showMessage(`${person.name} deleted`)
          })
          .catch(e => {
            showMessage(`Information of ${person.name} has already been removed from server`, true)
            setPersons(persons.filter(p => p.id !== person.id))
            console.log(e)
          })
      }
    }
  }

  const filteredPersons = filter
    ? persons.filter(person => {
      return person.name.toLowerCase().includes(filter.toLowerCase())
    })
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} error={error} />
      <Filter setFilter={setFilter} filter={filter} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        setNewName={setNewName}
        newName={newName}
        setNewNumber={setNewNumber}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} removePerson={removePerson} />
    </div>
  )
}

export default App
