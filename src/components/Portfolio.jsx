import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { HashLink } from 'react-router-hash-link';

import {
	Box,
	Container,
	Paper,
	IconButton,
	Typography
} from '@material-ui/core';
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
	}).isRequired,
	navIntersectionRef: PropTypes.func
};

function Portfolio({ resume, navIntersectionRef }) {
	return (
		<Fragment>
			<HeroContainer />
			<Box component="main" mt={-8} p={2}>
				<Container fixed>
					<Box px={2} pb={2} clone>
						<Paper id="start" ref={navIntersectionRef}>
							<Box mb={2} textAlign="center">
								<HashLink to="#start">
									<Typography color="textPrimary">
										<IconButton>
											<ExpandMore />
										</IconButton>
									</Typography>
								</HashLink>
							</Box>
							{resume.isLoading ? (
								<Loading size="40vh" />
							) : resume.error !== null ? (
								<Error size="40vh">
									Impossible de charger les données
								</Error>
							) : (
								<Fragment>
									<Box id="details" mb={4}>
										<DetailsContainer />
									</Box>
									<Box id="career" mb={4}>
										<CareerContainer />
									</Box>
									<Box id="skills" mb={4}>
										<SkillsContainer />
									</Box>
									<Box id="references">
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
