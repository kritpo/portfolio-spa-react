import React, { useEffect, Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { useHistory } from 'react-router-dom';

import * as routes from '../routes';

import { useInView } from 'react-intersection-observer';

import {
	Box,
	Container,
	Paper,
	IconButton,
	Typography
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

import Loading from '../tools/Loading';
import Error from '../tools/Error';
import CustomLink from '../tools/CustomLink';
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
	// retrieve the history object
	const history = useHistory();

	// setup the presentation intersection observer hook
	const { ref: detailsRef, inView: detailsInView } = useInView({
		rootMargin: '0% 0% -90% 0%'
	});
	useEffect(() => {
		// check if the details section are in viewport
		if (detailsInView) {
			history.push(`${routes.HOME}#details`);
		}
	}, [detailsInView, history]);

	// setup the career intersection observer hook
	const { ref: careerRef, inView: careerInView } = useInView({
		rootMargin: '0% 0% -90% 0%'
	});
	useEffect(() => {
		// check if the career section are in viewport
		if (careerInView) {
			history.push(`${routes.HOME}#career`);
		}
	}, [careerInView, history]);

	// setup the skills intersection observer hook
	const { ref: skillsRef, inView: skillsInView } = useInView({
		rootMargin: '0% 0% -90% 0%'
	});
	useEffect(() => {
		// check if the skills section are in viewport
		if (skillsInView) {
			history.push(`${routes.HOME}#skills`);
		}
	}, [history, skillsInView]);

	// setup the references intersection observer hook
	const { ref: referencesRef, inView: referencesInView } = useInView({
		rootMargin: '0% 0% -90% 0%'
	});
	useEffect(() => {
		// check if the references section are in viewport
		if (referencesInView) {
			history.push(`${routes.HOME}#references`);
		}
	}, [history, referencesInView]);

	// setup the no intersection observer hook
	useEffect(() => {
		// check if the all section are not in viewport
		if (
			!detailsInView &&
			!careerInView &&
			!skillsInView &&
			!referencesInView
		) {
			history.push('./');
		}
	}, [careerInView, detailsInView, history, referencesInView, skillsInView]);

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
									<Box mb={4} ref={detailsRef}>
										<Box
											position="relative"
											top="-4em"
											id="details"
										/>
										<DetailsContainer />
									</Box>
									<Box mb={4} ref={careerRef}>
										<Box
											position="relative"
											top="-4em"
											id="career"
										/>
										<CareerContainer />
									</Box>
									<Box mb={4} ref={skillsRef}>
										<Box
											position="relative"
											top="-4em"
											id="skills"
										/>
										<SkillsContainer />
									</Box>
									<Box ref={referencesRef}>
										<Box
											position="relative"
											top="-4em"
											id="references"
										/>
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
