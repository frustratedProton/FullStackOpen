import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
	]);
	const [newName, setNewName] = useState('');
	const [number, setNumber] = useState('');
	const [searchTerm, setSearchTerm] = useState('');

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
			alert(`${newName} is already added to the phonebook.`);
			return;
		}

		const personObject = {
			name: newName,
			number: number,
			id: persons.length + 1,
		};

		setPersons(persons.concat(personObject));
		setNewName('');
		setNumber('');
	};

	const filteredPersons = persons.filter((person) => {
		return person.name.toLowerCase().includes(searchTerm.toLowerCase());
	});

	return (
		<div>
			<h2>Phonebook</h2>

			<Filter 
        searchTerm={searchTerm} 
        handleSearchChange={handleSearchChange} 
      />

			<h3>Add a new</h3>
			<PersonForm
				newName={newName}
				number={number}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
				addName={addName}
			/>

			<h3>Numbers</h3>

			<Persons 
        filteredPersons={filteredPersons} 
      />
        
		</div>
	);
};

export default App;
