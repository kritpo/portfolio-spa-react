import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { Box, Container, Grid, Paper, IconButton } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

import Loading from '../components/Loading';
import Error from '../components/Error';
import HeroContainer from '../containers/HeroContainer';
import DetailsContainer from '../containers/DetailsContainer';
import CareerContainer from '../containers/CareerContainer';
import SkillContainer from '../containers/SkillContainer';
import ReferencesContainer from '../containers/ReferencesContainer';

// configure the prop types validation
Portfolio.propTypes = {
	resume: PropTypes.shape({
		isLoading: PropTypes.bool.isRequired,
		resume: PropTypes.object,
		error: PropTypes.string
	}).isRequired
};

function Portfolio({ resume }) {
	return (
		<Fragment>
			<HeroContainer />
			<Box component="main" mt={-8} p={2}>
				<Container fixed>
					<Box px={2} pb={2} clone>
						<Paper>
							<Box mb={2} textAlign="center">
								<IconButton>
									<ExpandMore />
								</IconButton>
							</Box>
							{resume.isLoading ? (
								<Loading size="40vh" />
							) : resume.error !== null ? (
								<Error size="40vh">
									Impossible de charger les données
								</Error>
							) : (
								<Fragment>
									<Box mb={4}>
										<DetailsContainer />
									</Box>
									<Box mb={4}>
										<CareerContainer />
									</Box>
									<Box mb={4} textAlign="center">
										<Grid container spacing={4}>
											<SkillContainer />
										</Grid>
									</Box>
									<Box textAlign="center">
										<ReferencesContainer />
									</Box>
								</Fragment>
							)}
						</Paper>
					</Box>
				</Container>
			</Box>
		</Fragment>
	);
}

export default Portfolio;
