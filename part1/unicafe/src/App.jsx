import { useState } from 'react';
import Statistics from './components/Statistics';
import Button from './components/Button';

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleGood = () => {
		setGood(good + 1);
	};

	const handleNeutral = () => {
		setNeutral(neutral + 1);
	};

	const handleBad = () => {
		setBad(bad + 1);
	};

	return (
		<div>
			<h1>Give feedback</h1>
      <Button text={"good"} onClick={handleGood} />
      <Button text={"neutral"} onClick={handleNeutral} />
      <Button text={"bad"} onClick={handleBad} />

			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
