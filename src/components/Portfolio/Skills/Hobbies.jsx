import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import languages from '../../../utils/languages';

import { Grid, Typography } from '@material-ui/core';

import InterestItem from './Hobbies/InterestItem';

/**
 * convert hobbies details to React component
 * @param {array} interests the list of interests data
 * @returns the components array
 */
const hobbies = interests =>
	interests.map((interest, index) => (
		<InterestItem interest={interest} key={index} />
	));

// configure the prop types validation
Hobbies.propTypes = {
	interests: PropTypes.arrayOf(PropTypes.object).isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function Hobbies({ interests, language: { systemLanguageCode } }) {
	return (
		<Fragment>
			<Typography component="h3" variant="h4" gutterBottom>
				{languages[systemLanguageCode].portfolio.interests.title}
			</Typography>
			<Grid container spacing={2} justify="center" alignItems="center">
				{interests.length > 0 ? (
					hobbies(interests)
				) : (
					<Typography variant="body1">
						{
							languages[systemLanguageCode].portfolio.interests
								.noElements
						}
					</Typography>
				)}
			</Grid>
		</Fragment>
	);
}

export default Hobbies;
