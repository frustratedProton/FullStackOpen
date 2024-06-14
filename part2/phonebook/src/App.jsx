import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import phoneService from './services/PhoneService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // console.log('effect');
    phoneService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleDelete = (number, name) => {
    const isConfirmed = window.confirm(
      `delete ${name}`
    );

    if (isConfirmed) {
      phoneService
        .remove(number)
        .then((deletedPerson) => {
          const updatedPersons = persons.filter(
            (person) => person.number !== deletedPerson.number
          );
          setPersons(updatedPersons);
          setNewName('');
          setNumber('');
        })
        .catch((error) => {
          console.error('Error deleting person:', error);
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const nameExists = (name) => {
    return persons.some((person) => {
      return person.name === name;
    });
  };

  const addName = (event) => {
    event.preventDefault();

    if (nameExists(newName)) {
      const isConfirmed = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      );

      if (!isConfirmed) {
        return;
      }

      const existingPerson = persons.find((person) => person.name === newName);

      const updatedPerson = {
        ...existingPerson,
        number: number,
      };

      phoneService
        .update(existingPerson.id, updatedPerson)
        .then((updatedPerson) => {
          const updatedPersons = persons.map((person) =>
            person.id === updatedPerson.id ? updatedPerson : person
          );
          setPersons(updatedPersons);
          setNewName('');
          setNumber('');
        })
        .catch((error) => {
          console.error('Error updating person:', error);
        });
    } else {
      const personObject = {
        name: newName,
        number: number,
      };

      phoneService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNumber('');
        })
        .catch((error) => {
          console.error('Error adding person:', error);
        });
    }
  };

  const filteredPersons = persons.filter((person) => {
    return person.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        number={number}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addName={addName}
      />

      <h3>Numbers</h3>

      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
