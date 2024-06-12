import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [number, setNumber] = useState('');
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		console.log('effect');
		axios
		.get('http://localhost:3001/persons')
		.then(res => {
			console.log('response got!', res.data)
			setPersons(res.data)
		})
	}, []);

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

			<Persons filteredPersons={filteredPersons} />
		</div>
	);
};

export default App;
