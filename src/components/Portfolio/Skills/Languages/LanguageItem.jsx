import { PropTypes } from 'prop-types';
import React from 'react';
import ReactCountryFlag from 'react-country-flag';

import { Box, Grid, Typography } from '@material-ui/core';

// configure the prop types validation
LanguageItem.propTypes = {
	language: PropTypes.shape({
		language: PropTypes.string.isRequired,
		fluency: PropTypes.string.isRequired,
		countryCode: PropTypes.string.isRequired
	}).isRequired
};

function LanguageItem({ language: { language, fluency, countryCode } }) {
	return (
		<Box fontSize="2em" clone>
			<Grid item xs={12} sm={6} lg={4} xl={3}>
				<ReactCountryFlag
					countryCode={countryCode}
					title={language}
					svg
				/>
				<Typography variant="body1">{language}</Typography>
				<Typography variant="body2" color="textSecondary">
					{fluency}
				</Typography>
			</Grid>
		</Box>
	);
}

export default LanguageItem;
