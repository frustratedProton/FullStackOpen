import Part from './Part';

/* eslint-disable react/prop-types */
const Content = ({ parts }) => {
	return (
		<>
			<div>
				{parts.map((part) => (
					<Part key={part.id} part={part} />
				))}
			</div>
		</>
	);
};

export default Content;
