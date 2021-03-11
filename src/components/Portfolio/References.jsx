import React from 'react';
import { PropTypes } from 'prop-types';

import { Box, Typography } from '@material-ui/core';

import ReferenceItem from './References/ReferenceItem';

/**
 * convert reference details to React component
 * @param {array} references the list of references data
 * @returns the components array
 */
const referencesList = references =>
	references.map((reference, index) => (
		<ReferenceItem reference={reference} key={index} />
	));

// configure the prop types validation
References.propTypes = {
	references: PropTypes.arrayOf(PropTypes.object).isRequired
};

function References({ references }) {
	return (
		<Box textAlign="center">
			<Typography component="h3" variant="h4" gutterBottom>
				Mes recommandations
			</Typography>
			{references.length > 0 ? (
				referencesList(references)
			) : (
				<Typography variant="body1">Aucune référence</Typography>
			)}
		</Box>
	);
}

export default References;
