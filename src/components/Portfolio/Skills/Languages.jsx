import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { Grid, Typography } from '@material-ui/core';

import LanguageItem from './Languages/LanguageItem';

/**
 * convert languages details to React component
 * @param {array} languages the list of languages data
 * @returns the components array
 */
const languagesList = languages =>
	languages.map((language, index) => (
		<LanguageItem language={language} key={index} />
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
			<Grid container spacing={2} justify="center" alignItems="center">
				{languages.length > 0 ? (
					languagesList(languages)
				) : (
					<Typography variant="body1">Aucune langue</Typography>
				)}
			</Grid>
		</Fragment>
	);
}

export default Languages;
