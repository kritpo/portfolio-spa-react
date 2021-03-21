import { PropTypes } from 'prop-types';
import React from 'react';

import { Box, Button, Grid, Typography } from '@material-ui/core';

import CustomIcon from '../../../utils/icons/CustomIcon';

// configure the prop types validation
SocialNetwork.propTypes = {
	profile: PropTypes.shape({
		url: PropTypes.string.isRequired,
		network: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired
	}).isRequired
};

function SocialNetwork({ profile: { url, network, username } }) {
	return (
		<Grid item xs={6} sm={4}>
			<Button href={url} target="_blank">
				<Box display="flex" flexDirection="column" alignItems="center">
					<CustomIcon social={network} />
					<Typography
						variant="body1"
						style={{ textTransform: 'none' }}
						noWrap
					>
						{username}
					</Typography>
				</Box>
			</Button>
		</Grid>
	);
}

export default SocialNetwork;
