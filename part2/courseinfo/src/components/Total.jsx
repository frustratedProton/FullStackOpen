/* eslint-disable react/prop-types */
const Total = ({ parts }) => {
	const totalExercises = parts.reduce(
		(total, part) => total + part.exercises,
		0
	);

	return (
		<>
			<h4>Total of {totalExercises} exercises</h4>
		</>
	);
};
export default Total;
