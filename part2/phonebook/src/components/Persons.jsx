/* eslint-disable react/prop-types */
const Persons = ({ filteredPersons, handleDelete }) => {
	return (
			<div>
					{filteredPersons.map((person) => (
							<span key={person.number}>
									<p>
											{person.name} {person.number}
											<button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
									</p>
							</span>
					))}
			</div>
	);
};

export default Persons;
