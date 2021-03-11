import React from 'react';
import { PropTypes } from 'prop-types';

import { Box, Grid, Typography } from '@material-ui/core';

import LanguageIcon from '../../../../utils/icons/LanguageIcon';

// configure the prop types validation
LanguageItem.propTypes = {
	language: PropTypes.shape({
		language: PropTypes.string.isRequired,
		fluency: PropTypes.string.isRequired
	}).isRequired
};

function LanguageItem({ language: { language, fluency } }) {
	return (
		<Box fontSize="2em" clone>
			<Grid item xs={12} sm={6} lg={4} xl={3}>
				<LanguageIcon language={language} />
				<Typography variant="body1">{language}</Typography>
				<Typography variant="body2" color="textSecondary">
					{fluency}
				</Typography>
			</Grid>
		</Box>
	);
}

export default LanguageItem;
