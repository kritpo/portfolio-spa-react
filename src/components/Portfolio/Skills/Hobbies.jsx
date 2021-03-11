import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

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
	resume: PropTypes.shape({
		interests: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string.isRequired,
				keywords: PropTypes.arrayOf(PropTypes.string).isRequired
			})
		).isRequired
	}).isRequired
};

function Hobbies({ resume: { interests } }) {
	return (
		<Fragment>
			<Typography component="h3" variant="h4" gutterBottom>
				Centres d'intérêts
			</Typography>
			<Grid container spacing={2} justify="center" alignItems="center">
				{interests.length > 0 ? (
					hobbies(interests)
				) : (
					<Typography variant="body1">
						Aucun centre d'intérêts
					</Typography>
				)}
			</Grid>
		</Fragment>
	);
}

export default Hobbies;
