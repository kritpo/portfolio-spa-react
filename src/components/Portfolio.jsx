import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { Box, Container, Paper, IconButton } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

import Loading from '../components/Loading';
import Error from '../components/Error';
import HeroContainer from '../containers/Portfolio/HeroContainer';
import DetailsContainer from '../containers/Portfolio/DetailsContainer';
import CareerContainer from '../containers/Portfolio/CareerContainer';
import SkillsContainer from '../containers/Portfolio/SkillsContainer';
import ReferencesContainer from '../containers/Portfolio/ReferencesContainer';

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
									<Box mb={4}>
										<SkillsContainer />
									</Box>
									<ReferencesContainer />
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
