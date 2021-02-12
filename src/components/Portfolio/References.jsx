import React from 'react';
import { PropTypes } from 'prop-types';

import { Box, Card, CardContent, Typography } from '@material-ui/core';
import { FormatQuote } from '@material-ui/icons';

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

function References({ resume }) {
	// convert reference details to React component
	const references = resume.references.map((reference, index) => (
		<Box m={4} elevation={4} clone key={index}>
			<Card>
				<Box mt={1} ml={2} align="left">
					<FormatQuote fontSize="large" />
				</Box>
				<CardContent>
					<Typography variant="body1">
						{reference.reference}
					</Typography>
				</CardContent>
				<Box ml={2} mb={1} align="left" fontStyle="italic">
					<Typography variant="caption" color="textSecondary">
						-- {reference.name}
					</Typography>
				</Box>
				<Box mb={1} mr={2} align="right">
					<FormatQuote fontSize="large" />
				</Box>
			</Card>
		</Box>
	));

	return (
		<Box textAlign="center">
			<Typography component="h3" variant="h4" gutterBottom>
				Mes recommandations
			</Typography>
			{references}
		</Box>
	);
}

export default References;
