import { Box, Grid, Typography } from '@material-ui/core';
import { PropTypes } from 'prop-types';
import React from 'react';

import CustomIcon from '../../../../utils/icons/CustomIcon';

// configure the prop types validation
ReferenceItem.propTypes = {
	interest: PropTypes.shape({
		name: PropTypes.string.isRequired,
		keywords: PropTypes.arrayOf(PropTypes.string).isRequired
	}).isRequired
};

function ReferenceItem({ interest: { name, keywords } }) {
	return (
		<Box fontSize="2em" clone>
			<Grid item xs={12} sm={6} lg={4} xl={3}>
				<CustomIcon hobby={name} />
				{keywords.map((keyword, index) => (
					<Typography
						variant="body2"
						color="textSecondary"
						key={index}
					>
						{keyword}
					</Typography>
				))}
			</Grid>
		</Box>
	);
}

export default ReferenceItem;
