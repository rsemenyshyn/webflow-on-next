import React from 'react';

import TestCard from '../components/TestCard';

const Grid = (props) => {

	const rows = props?.dataset?.rows ? parseInt(props?.dataset.rows) : 1;
	const cols = props?.dataset?.cols ? parseInt(props?.dataset.cols) : 3;

	const styleRow = { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' };

	return (
		<div>
			{[...Array(rows).keys()].map(() => {
				return (
					<div style={styleRow} key={Math.random() * 10000001}>
						{[...Array(cols).keys()].map(() => {
							return (
								<TestCard key={Math.random() * 10000001}/>
							);
						})}
					</div>
				);
			})}
		</div>
	);
}

export default Grid;
