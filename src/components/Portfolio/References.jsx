import { Box, Typography } from '@material-ui/core';
import { PropTypes } from 'prop-types';
import React from 'react';

import languages from '../../utils/languages';
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
	references: PropTypes.arrayOf(PropTypes.object).isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function References({ references, language: { systemLanguageCode } }) {
	return (
		<Box textAlign="center">
			<Typography component="h3" variant="h4" gutterBottom>
				{languages[systemLanguageCode].portfolio.references.title}
			</Typography>
			{references.length > 0 ? (
				referencesList(references)
			) : (
				<Typography variant="body1">
					{
						languages[systemLanguageCode].portfolio.references
							.noElements
					}
				</Typography>
			)}
		</Box>
	);
}

export default References;
