import React from 'react';
import { PropTypes } from 'prop-types';

import { Box, Grid, Typography } from '@material-ui/core';

import LanguageIcon from './tools/icons/LanguageIcon';

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

function Languages({ resume }) {
	// convert languages details to React component
	const languages = resume.languages.map((language, index) => (
		<Box fontSize="2em" clone key={index}>
			<Grid item xs={12} sm={6} lg={4} xl={3}>
				<LanguageIcon language={language.language} />
				<Typography variant="body1">{language.language}</Typography>
				<Typography variant="body2" color="textSecondary">
					{language.fluency}
				</Typography>
			</Grid>
		</Box>
	));

	return (
		<Grid item xs={12} md={6}>
			<Typography component="h3" variant="h4" gutterBottom>
				Langues
			</Typography>
			<Grid container spacing={2} alignItems="center">
				{languages}
			</Grid>
		</Grid>
	);
}

export default Languages;
