import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { Box, Grid, Typography } from '@material-ui/core';

import LanguageIcon from '../../../utils/icons/LanguageIcon';

/**
 * convert languages details to React component
 * @param {array} languages the list of languages data
 * @returns the components array
 */
const languagesList = languages =>
	languages.map(({ language, fluency }, index) => (
		<Box fontSize="2em" clone key={index}>
			<Grid item xs={12} sm={6} lg={4} xl={3}>
				<LanguageIcon language={language} />
				<Typography variant="body1">{language}</Typography>
				<Typography variant="body2" color="textSecondary">
					{fluency}
				</Typography>
			</Grid>
		</Box>
	));

// configure the prop types validation
Languages.propTypes = {
	resume: PropTypes.shape({
		languages: PropTypes.arrayOf(
			PropTypes.shape({
				language: PropTypes.string.isRequired,
				fluency: PropTypes.string.isRequired
			})
		).isRequired
	}).isRequired
};

function Languages({ resume: { languages } }) {
	return (
		<Fragment>
			<Typography component="h3" variant="h4" gutterBottom>
				Langues
			</Typography>
			<Grid container spacing={2} alignItems="center">
				{languagesList(languages)}
			</Grid>
		</Fragment>
	);
}

export default Languages;
