import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { Box, Container, Paper, IconButton } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

import Loading from '../tools/Loading';
import Error from '../tools/Error';
import CustomLink from '../tools/CustomLink';
import AutoHashMatcher from '../tools/AutoHashMatcher';
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
								<CustomLink to="#start" hash smooth>
									<IconButton>
										<ExpandMore />
									</IconButton>
								</CustomLink>
							</Box>
							{resume.isLoading ? (
								<Loading size="40vh" />
							) : resume.error !== null ? (
								<Error size="40vh">
									Impossible de charger les données
								</Error>
							) : (
								<Fragment>
									<AutoHashMatcher hashText="details">
										<Box mb={4}>
											<Box
												position="relative"
												top="-4em"
												id="details"
											/>
											<DetailsContainer />
										</Box>
									</AutoHashMatcher>
									<AutoHashMatcher hashText="career">
										<Box mb={4}>
											<Box
												position="relative"
												top="-4em"
												id="career"
											/>
											<CareerContainer />
										</Box>
									</AutoHashMatcher>
									<AutoHashMatcher hashText="skills">
										<Box mb={4}>
											<Box
												position="relative"
												top="-4em"
												id="skills"
											/>
											<SkillsContainer />
										</Box>
									</AutoHashMatcher>
									<AutoHashMatcher hashText="references">
										<Box>
											<Box
												position="relative"
												top="-4em"
												id="references"
											/>
											<ReferencesContainer />
										</Box>
									</AutoHashMatcher>
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
