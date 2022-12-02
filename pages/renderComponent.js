import React from 'react';
import { domToReact } from 'html-react-parser';

import Grid from '../widgets/Grid';

export function renderComponent(node, parseOptions) {

	const attribs = node.attribs || {};
	const { style, ...props } = attribs;

	const dataset = Object.keys(attribs).reduce((obj, attrName) => {
		if (attrName.indexOf('data-') === 0) {
			obj[snakeToCamel(attrName.replace('data-', ''))] = attribs[attrName];
		}
		return obj;
	}, {});

	console.log('dataset', dataset);

	if (attribs['data-type'] === 'grid') {
		return (
			<Grid { ...props } css={style ? style : null} dataset={dataset}>
				{!!node.children && !!node.children.length && domToReact(node.children, parseOptions)}
			</Grid>
		);
	}
}

const snakeToCamel = str => str.toLowerCase().replace(/([-_][a-z])/g, group =>
	group.toUpperCase().replace('-', '').replace('_', '')
);
