import React from 'react';
import { PropTypes } from 'prop-types';

import { Box, Grid, Typography } from '@material-ui/core';

import CustomIcon from './tools/icons/CustomIcon';

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

function Hobbies({ resume }) {
	// convert hobbies details to React component
	const hobbies = resume.interests.map((interest, index) => (
		<Box fontSize="2em" clone key={index}>
			<Grid item xs={12} sm={6} lg={4} xl={3}>
				<CustomIcon hobby={interest.name} />
				{interest.keywords.map((keyword, index) => (
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

	return (
		<Grid item xs={12} md={6}>
			<Typography component="h3" variant="h4" gutterBottom>
				Centres d'intérêts
			</Typography>
			<Grid container spacing={2} justify="center" alignItems="center">
				{hobbies}
			</Grid>
		</Grid>
	);
}

export default Hobbies;
