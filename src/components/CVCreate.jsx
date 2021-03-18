import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { HOME, CVS } from '../routes';

import {
	Container,
	Box,
	Paper,
	Stepper,
	Step,
	StepLabel,
	StepContent,
	Typography,
	Button
} from '@material-ui/core';

import Header from './Header';
import BasicsContainer, { BASICS } from '../containers/CV/BasicsContainer';
import WorkContainer, { WORK } from '../containers/CV/WorkContainer';
import VolunteerContainer, {
	VOLUNTEER
} from '../containers/CV/VolunteerContainer';
import EducationContainer, {
	EDUCATION
} from '../containers/CV/EducationContainer';
import ProjectsContainer, {
	PROJECTS
} from '../containers/CV/ProjectsContainer';
import SkillsContainer, { SKILLS } from '../containers/CV/SkillsContainer';
import LanguagesContainer, {
	LANGUAGES
} from '../containers/CV/LanguagesContainer';
import InterestsContainer, {
	INTERESTS
} from '../containers/CV/InterestsContainer';
import ReferencesContainer, {
	REFERENCES
} from '../containers/CV/ReferencesContainer';

import Form from '../utils/forms/Form';

// setup the labels list
const labels = [
	'Détails',
	'Expérience professionnelle',
	'Expérience associative',
	'Formation',
	'Projets',
	'Compétences',
	'Langues',
	"Centre d'intérêts",
	'Références'
];

/**
 * setup the components list
 * @param {object} data the list of data
 * @param {function} handleNext the forms submit function, to go to next step
 * @returns the components array
 */
const components = (data, handleNext) => [
	<BasicsContainer
		data={data[BASICS]}
		onSubmit={handleNext(BASICS)}
		action="Suivant"
	/>,
	<WorkContainer
		data={data[WORK]}
		onSubmit={handleNext(WORK)}
		action="Suivant"
	/>,
	<VolunteerContainer
		data={data[VOLUNTEER]}
		onSubmit={handleNext(VOLUNTEER)}
		action="Suivant"
	/>,
	<EducationContainer
		data={data[EDUCATION]}
		onSubmit={handleNext(EDUCATION)}
		action="Suivant"
	/>,
	<ProjectsContainer
		data={data[PROJECTS]}
		onSubmit={handleNext(PROJECTS)}
		action="Suivant"
	/>,
	<SkillsContainer
		data={data[SKILLS]}
		onSubmit={handleNext(SKILLS)}
		action="Suivant"
	/>,
	<LanguagesContainer
		data={data[LANGUAGES]}
		onSubmit={handleNext(LANGUAGES)}
		action="Suivant"
	/>,
	<InterestsContainer
		data={data[INTERESTS]}
		onSubmit={handleNext(INTERESTS)}
		action="Suivant"
	/>,
	<ReferencesContainer
		data={data[REFERENCES]}
		onSubmit={handleNext(REFERENCES)}
		action="Suivant"
	/>
];

/**
 * compute all the steps
 * @param {int} currentStep the current step index
 * @param {function} handleSetStep the update step function
 * @param {array} components the list of components
 * @returns the list of steps
 */
const steps = (currentStep, handleSetStep, components) =>
	labels.map(
		(label, index) =>
			components[index] && (
				<Step key={index}>
					<StepLabel>
						<Button
							onClick={handleSetStep(index)}
							disabled={index >= currentStep}
						>
							{label}
						</Button>
					</StepLabel>
					<StepContent>
						<Box display="flex" justifyContent="center">
							{components[index]}
						</Box>
					</StepContent>
				</Step>
			)
	);

// configure the prop types validation
CVCreate.propTypes = {
	currentStep: PropTypes.number.isRequired,
	handleNext: PropTypes.func.isRequired,
	handleSetStep: PropTypes.func.isRequired,
	data: PropTypes.objectOf(PropTypes.array).isRequired,
	languageCodeData: PropTypes.array.isRequired,
	languageCodeTemplate: PropTypes.object.isRequired,
	onSubmit: PropTypes.func.isRequired
};

function CVCreate({
	currentStep,
	handleNext,
	handleSetStep,
	data,
	languageCodeData,
	languageCodeTemplate,
	onSubmit
}) {
	return (
		<Fragment>
			<Header
				title="Créer un CV"
				history={[
					{ link: HOME, title: 'Accueil' },
					{ link: CVS, title: 'CVs' }
				]}
			/>
			<Container component="main" fixed>
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					p={2}
					clone
				>
					<Paper>
						<Typography component="h2" variant="h4">
							Créer un CV
						</Typography>
						<Box width="100%" maxWidth="650px" mx="auto" clone>
							<Stepper
								activeStep={currentStep}
								orientation="vertical"
							>
								{steps(
									currentStep,
									handleSetStep,
									components(data, handleNext)
								)}
								<Step>
									<StepLabel>Langue du CV</StepLabel>
									<StepContent>
										<Box
											display="flex"
											justifyContent="center"
										>
											<Form
												data={languageCodeData}
												template={languageCodeTemplate}
												onSubmit={onSubmit}
												action="Créer"
												errorMessage="Une erreur inconnue est survenue, veuillez réessayer ultérieurement."
											/>
										</Box>
									</StepContent>
								</Step>
							</Stepper>
						</Box>
					</Paper>
				</Box>
			</Container>
		</Fragment>
	);
}

export default CVCreate;
