import { PropTypes } from 'prop-types';
import React, { Fragment } from 'react';

import {
	Box,
	Button,
	Container,
	Paper,
	Step,
	StepContent,
	StepLabel,
	Stepper,
	Typography
} from '@material-ui/core';

import BasicsContainer, { BASICS } from '../containers/CV/BasicsContainer';
import EducationContainer, {
	EDUCATION
} from '../containers/CV/EducationContainer';
import InterestsContainer, {
	INTERESTS
} from '../containers/CV/InterestsContainer';
import LanguagesContainer, {
	LANGUAGES
} from '../containers/CV/LanguagesContainer';
import ProjectsContainer, {
	PROJECTS
} from '../containers/CV/ProjectsContainer';
import ReferencesContainer, {
	REFERENCES
} from '../containers/CV/ReferencesContainer';
import SkillsContainer, { SKILLS } from '../containers/CV/SkillsContainer';
import VolunteerContainer, {
	VOLUNTEER
} from '../containers/CV/VolunteerContainer';
import WorkContainer, { WORK } from '../containers/CV/WorkContainer';
import { CV_LIST, HOME } from '../routes';
import Form from '../utils/forms/Form';
import languages from '../utils/languages';
import Header from './Header';

/**
 * setup the components list
 * @param {object} data the list of data
 * @param {function} handleNext the forms submit function, to go to next step
 * @param {string} nextButton the text of next button
 * @returns the components array
 */
const components = (data, handleNext, nextButton) => [
	<BasicsContainer
		data={data[BASICS]}
		onSubmit={handleNext(BASICS)}
		action={nextButton}
	/>,
	<WorkContainer
		data={data[WORK]}
		onSubmit={handleNext(WORK)}
		action={nextButton}
	/>,
	<VolunteerContainer
		data={data[VOLUNTEER]}
		onSubmit={handleNext(VOLUNTEER)}
		action={nextButton}
	/>,
	<EducationContainer
		data={data[EDUCATION]}
		onSubmit={handleNext(EDUCATION)}
		action={nextButton}
	/>,
	<ProjectsContainer
		data={data[PROJECTS]}
		onSubmit={handleNext(PROJECTS)}
		action={nextButton}
	/>,
	<SkillsContainer
		data={data[SKILLS]}
		onSubmit={handleNext(SKILLS)}
		action={nextButton}
	/>,
	<LanguagesContainer
		data={data[LANGUAGES]}
		onSubmit={handleNext(LANGUAGES)}
		action={nextButton}
	/>,
	<InterestsContainer
		data={data[INTERESTS]}
		onSubmit={handleNext(INTERESTS)}
		action={nextButton}
	/>,
	<ReferencesContainer
		data={data[REFERENCES]}
		onSubmit={handleNext(REFERENCES)}
		action={nextButton}
	/>
];

/**
 * compute all the steps
 * @param {int} currentStep the current step index
 * @param {function} handleSetStep the update step function
 * @param {array} components the list of components
 * @param {array} labels the list of labels
 * @returns the list of steps
 */
const steps = (currentStep, handleSetStep, components, labels) =>
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
	onSubmit: PropTypes.func.isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function CVCreate({
	currentStep,
	handleNext,
	handleSetStep,
	data,
	languageCodeData,
	languageCodeTemplate,
	onSubmit,
	language: { systemLanguageCode }
}) {
	return (
		<Fragment>
			<Header
				title={languages[systemLanguageCode].pages.cvCreate}
				history={[
					{
						link: HOME,
						title: languages[systemLanguageCode].pages.home
					},
					{
						link: CV_LIST,
						title: languages[systemLanguageCode].pages.cvList
					}
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
							{languages[systemLanguageCode].pages.cvCreate}
						</Typography>
						<Box width="100%" maxWidth="650px" mx="auto" clone>
							<Stepper
								activeStep={currentStep}
								orientation="vertical"
							>
								{steps(
									currentStep,
									handleSetStep,
									components(
										data,
										handleNext,
										languages[systemLanguageCode].cvCreate
											.nextButton
									),
									languages[systemLanguageCode].cvCreate
										.labels
								)}
								<Step>
									<StepLabel>
										{
											languages[systemLanguageCode]
												.cvCreate.languageCodeLabel
										}
									</StepLabel>
									<StepContent>
										<Box
											display="flex"
											justifyContent="center"
										>
											<Form
												data={languageCodeData}
												template={languageCodeTemplate}
												onSubmit={onSubmit}
												action={
													languages[
														systemLanguageCode
													].cvCreate.action
												}
												errorMessage={
													languages[
														systemLanguageCode
													].cvCreate.error
												}
												sendingMessage={
													languages[
														systemLanguageCode
													].generic.sendingMessage
												}
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
