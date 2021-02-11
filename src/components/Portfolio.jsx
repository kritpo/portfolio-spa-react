import React, { lazy, Fragment, Suspense } from 'react';
import { PropTypes } from 'prop-types';

import { Box, Container, Paper, IconButton } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

import Loading from '../tools/Loading';
import Error from '../tools/Error';
import CustomLink from '../tools/CustomLink';
import AutoHashMatcher from '../tools/AutoHashMatcher';
import HeroContainer from '../containers/Portfolio/HeroContainer';

// import components in lazy mode
const DetailsContainer = lazy(() =>
	import('../containers/Portfolio/DetailsContainer')
);
const CareerContainer = lazy(() =>
	import('../containers/Portfolio/CareerContainer')
);
const SkillsContainer = lazy(() =>
	import('../containers/Portfolio/SkillsContainer')
);
const ReferencesContainer = lazy(() =>
	import('../containers/Portfolio/ReferencesContainer')
);

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
											<Suspense
												fallback={
													<Loading size="40vh" />
												}
											>
												<DetailsContainer />
											</Suspense>
										</Box>
									</AutoHashMatcher>
									<AutoHashMatcher hashText="career">
										<Box mb={4}>
											<Box
												position="relative"
												top="-4em"
												id="career"
											/>
											<Suspense
												fallback={
													<Loading size="40vh" />
												}
											>
												<CareerContainer />
											</Suspense>
										</Box>
									</AutoHashMatcher>
									<AutoHashMatcher hashText="skills">
										<Box mb={4}>
											<Box
												position="relative"
												top="-4em"
												id="skills"
											/>
											<Suspense
												fallback={
													<Loading size="40vh" />
												}
											>
												<SkillsContainer />
											</Suspense>
										</Box>
									</AutoHashMatcher>
									<AutoHashMatcher hashText="references">
										<Box>
											<Box
												position="relative"
												top="-4em"
												id="references"
											/>
											<Suspense
												fallback={
													<Loading size="40vh" />
												}
											>
												<ReferencesContainer />
											</Suspense>
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
