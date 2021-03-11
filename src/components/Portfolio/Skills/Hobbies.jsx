import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { Box, Grid, Typography } from '@material-ui/core';

import CustomIcon from '../../../utils/icons/CustomIcon';

/**
 * convert hobbies details to React component
 * @param {array} interests the list of interests data
 * @returns the components array
 */
const hobbies = interests =>
	interests.map(({ name, keywords }, index) => (
		<Box fontSize="2em" clone key={index}>
			<Grid item xs={12} sm={6} lg={4} xl={3}>
				<CustomIcon hobby={name} notExact />
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
