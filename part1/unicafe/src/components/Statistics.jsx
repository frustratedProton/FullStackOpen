import StatisticLine from './StatisticLine';

// eslint-disable-next-line react/prop-types
const Statistics = ({ good, neutral, bad }) => {
	const all = good + bad + neutral;
	const average = (good * 1 + neutral * 0 + bad * -1)/all;
	const positiveFeedback = (good / all) * 100;

	if (all === 0) {
		return (
			<div>
				<h1>statistics</h1>
				<p>No feedback given</p>
			</div>
		);
	}

	return (
		<div>
			<h1>statistics</h1>
			<table>
				<tbody>
					<StatisticLine text="Good" value={good} />
					<StatisticLine text="Neutral" value={neutral} />
					<StatisticLine text="Bad" value={bad} />
					<StatisticLine text="Total" value={all} />
					<StatisticLine text="Average" value={average.toFixed(1)} />
					<StatisticLine
						text="Positive "
						value={`${positiveFeedback.toFixed(1)}%`}
					/>
				</tbody>
			</table>
		</div>
	);
};

export default Statistics;
