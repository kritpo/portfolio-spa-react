import { Grid, Typography } from '@material-ui/core';
import { PropTypes } from 'prop-types';
import React, { Fragment } from 'react';

import languages_const from '../../../utils/languages';
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
	languages: PropTypes.arrayOf(PropTypes.object).isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function Languages({ languages, language: { systemLanguageCode } }) {
	return (
		<Fragment>
			<Typography component="h3" variant="h4" gutterBottom>
				{languages_const[systemLanguageCode].portfolio.languages.title}
			</Typography>
			<Grid container spacing={2} justify="center" alignItems="center">
				{languages.length > 0 ? (
					languagesList(languages)
				) : (
					<Typography variant="body1">
						{
							languages_const[systemLanguageCode].portfolio
								.languages.noElements
						}
					</Typography>
				)}
			</Grid>
		</Fragment>
	);
}

export default Languages;
