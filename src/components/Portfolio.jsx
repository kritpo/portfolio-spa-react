import { PropTypes } from 'prop-types';
import React, { Fragment, Suspense, lazy } from 'react';

import { Box, Container, IconButton, Paper } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

import HeroContainer from '../containers/Portfolio/HeroContainer';
import AutoHashMatcher from '../utils/AutoHashMatcher';
import CustomLink from '../utils/CustomLink';
import Error from '../utils/Error';
import Loading from '../utils/Loading';
import languages from '../utils/languages';

// import components in lazy mode
const DetailsContainer = lazy(() =>
	import('../containers/Portfolio/DetailsContainer')
);
const CareerContainer = lazy(() =>
	import('../containers/Portfolio/CareerContainer')
);
const ProjectsContainer = lazy(() =>
	import('../containers/Portfolio/ProjectsContainer')
);
const Skills = lazy(() => import('./Portfolio/Skills'));
const ReferencesContainer = lazy(() =>
	import('../containers/Portfolio/ReferencesContainer')
);

// configure the prop types validation
Portfolio.propTypes = {
	resume: PropTypes.shape({
		resume: PropTypes.object.isRequired,
		isLoading: PropTypes.bool.isRequired,
		error: PropTypes.string
	}).isRequired,
	navIntersectionRef: PropTypes.func,
	isMain: PropTypes.bool.isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function Portfolio({
	resume: { resume, isLoading, error },
	navIntersectionRef,
	isMain,
	language: { systemLanguageCode }
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
								<CustomLink
									aria-label="Start"
									to="#start"
									hash
									smooth
								>
									<IconButton aria-label="See">
										<ExpandMore />
									</IconButton>
								</CustomLink>
							</Box>
							{isLoading ? (
								<Loading size="40vh" />
							) : error !== null ? (
								<Error size="40vh">
									{
										languages[systemLanguageCode].generic
											.loadingError
									}
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
												<DetailsContainer
													basics={resume.basics}
													isMain={isMain}
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
												<ProjectsContainer
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
												<ReferencesContainer
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
