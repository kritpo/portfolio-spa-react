import { PropTypes } from 'prop-types';
import React from 'react';

import { Box, Card, CardContent, Typography } from '@material-ui/core';
import { FormatQuote } from '@material-ui/icons';

// configure the prop types validation
ReferenceItem.propTypes = {
	reference: PropTypes.shape({
		reference: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired
	}).isRequired
};

function ReferenceItem({ reference: { reference, name } }) {
	return (
		<Box m={4} elevation={4} clone>
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
	);
}

export default ReferenceItem;
