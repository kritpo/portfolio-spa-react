import { PropTypes } from 'prop-types';
import React from 'react';

import { Box, CircularProgress } from '@material-ui/core';

// configure the prop types validation
Loading.propTypes = {
	size: PropTypes.string.isRequired
};

function Loading({ size }) {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			width="100%"
			height="100%"
		>
			<CircularProgress size={size} thickness={2} />
		</Box>
	);
}

export default Loading;
