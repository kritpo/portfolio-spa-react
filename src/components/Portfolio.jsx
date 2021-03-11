import React, { lazy, Fragment, Suspense } from 'react';
import { PropTypes } from 'prop-types';

import { Box, Container, Paper, IconButton } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

import Loading from '../utils/Loading';
import Error from '../utils/Error';
import CustomLink from '../utils/CustomLink';
import AutoHashMatcher from '../utils/AutoHashMatcher';
import HeroContainer from '../containers/Portfolio/HeroContainer';

// import components in lazy mode
const Details = lazy(() => import('./Portfolio/Details'));
const CareerContainer = lazy(() =>
	import('../containers/Portfolio/CareerContainer')
);
const Projects = lazy(() => import('./Portfolio/Projects'));
const Skills = lazy(() => import('./Portfolio/Skills'));
const References = lazy(() => import('./Portfolio/References'));

// configure the prop types validation
Portfolio.propTypes = {
	resume: PropTypes.shape({
		resume: PropTypes.object.isRequired,
		isLoading: PropTypes.bool.isRequired,
		error: PropTypes.string
	}).isRequired,
	navIntersectionRef: PropTypes.func,
	isMain: PropTypes.bool.isRequired
};

function Portfolio({
	resume: { resume, isLoading, error },
	navIntersectionRef,
	isMain
}) {
	return (
		<Fragment>
			<HeroContainer
				resume={{ resume, isLoading, error }}
				isMain={isMain}
			/>
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
							{isLoading ? (
								<Loading size="40vh" />
							) : error !== null ? (
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
												<Details
													basics={resume.basics}
												/>
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
												<CareerContainer
													work={resume.work}
													education={resume.education}
													volunteer={resume.volunteer}
												/>
											</Suspense>
										</Box>
									</AutoHashMatcher>
									<AutoHashMatcher hashText="projects">
										<Box mb={4}>
											<Box
												position="relative"
												top="-4em"
												id="projects"
											/>
											<Suspense
												fallback={
													<Loading size="40vh" />
												}
											>
												<Projects
													projects={resume.projects}
												/>
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
												<Skills
													skills={resume.skills}
													languages={resume.languages}
													interests={resume.interests}
												/>
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
												<References
													references={
														resume.references
													}
												/>
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
