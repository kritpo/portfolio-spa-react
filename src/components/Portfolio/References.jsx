import React from 'react';
import { PropTypes } from 'prop-types';

import { Box, Card, CardContent, Typography } from '@material-ui/core';
import { FormatQuote } from '@material-ui/icons';

/**
 * convert reference details to React component
 * @param {array} references the list of references data
 * @returns the components array
 */
const referencesList = references =>
	references.map(({ reference, name }, index) => (
		<Box m={4} elevation={4} clone key={index}>
			<Card>
				<Box mt={1} ml={2} align="left">
					<FormatQuote fontSize="large" />
				</Box>
				<CardContent>
					<Typography variant="body1">{reference}</Typography>
				</CardContent>
				<Box ml={2} mb={1} align="left" fontStyle="italic">
					<Typography variant="caption" color="textSecondary">
						-- {name}
					</Typography>
				</Box>
				<Box mb={1} mr={2} align="right">
					<FormatQuote fontSize="large" />
				</Box>
			</Card>
		</Box>
	));

// configure the prop types validation
References.propTypes = {
	resume: PropTypes.shape({
		references: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string.isRequired,
				reference: PropTypes.string.isRequired
			})
		).isRequired
	}).isRequired
};

function References({ resume: { references } }) {
	return (
		<Box textAlign="center">
			<Typography component="h3" variant="h4" gutterBottom>
				Mes recommandations
			</Typography>
			{referencesList(references)}
		</Box>
	);
}

export default References;
