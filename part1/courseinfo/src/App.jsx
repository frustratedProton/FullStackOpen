/* eslint-disable react/prop-types */
const Header = (props) => {
	return (
		<>
			<h1>{props.course}</h1>
		</>
	);
};

const Content = (props) => {
	return (
		<>
			<div>
				<Part
					exercisesName={props.parts[0].name}
					exercisesCount={props.parts[0].exercises}
				/>

				<Part
					exercisesName={props.parts[0].name}
					exercisesCount={props.parts[0].exercises}
				/>

				<Part
					exercisesName={props.parts[0].name}
					exercisesCount={props.parts[0].exercises}
				/>
			</div>
		</>
	);
};

const Part = (props) => {
	return (
		<p>
			{props.exercisesName} {props.exercisesCount}
		</p>
	);
};

const Total = (props) => {
	return (
		<>
			<p>
				Number of exercises{' '}
				{props.parts[0].exercises +
					props.parts[1].exercises +
					props.parts[2].exercises}
			</p>
		</>
	);
};

const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
			{
				name: 'Fundamentals of React',
				exercises: 10,
			},
			{
				name: 'Using props to pass data',
				exercises: 7,
			},
			{
				name: 'State of a component',
				exercises: 14,
			},
		],
	};

	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	);
};

export default App;
