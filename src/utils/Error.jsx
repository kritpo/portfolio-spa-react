import { Box, Typography } from '@material-ui/core';
import { Warning } from '@material-ui/icons';
import { PropTypes } from 'prop-types';
import React from 'react';

// configure the prop types validation
Error.propTypes = {
	children: PropTypes.string.isRequired,
	size: PropTypes.string.isRequired
};

function Error({ children, size }) {
	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			width="100%"
			height="100%"
		>
			<Box fontSize={size} clone>
				<Warning />
			</Box>
			<Typography component="h3" variant="h3" align="center">
				{children}
			</Typography>
		</Box>
	);
}

export default Error;
