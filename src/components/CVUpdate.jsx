import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { HOME, CVS } from '../routes';

import {
	Container,
	Box,
	Paper,
	AppBar,
	Tab,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	Typography
} from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';

import Header from './Header';
import Loading from '../utils/Loading';
import Error from '../utils/Error';
import UpdateBasicsContainer from '../containers/CVUpdate/UpdateBasicsContainer';
import UpdateWorkContainer from '../containers/CVUpdate/UpdateWorkContainer';
import UpdateVolunteerContainer from '../containers/CVUpdate/UpdateVolunteerContainer';
import UpdateEducationContainer from '../containers/CVUpdate/UpdateEducationContainer';
import UpdateProjectsContainer from '../containers/CVUpdate/UpdateProjectsContainer';
import UpdateSkillsContainer from '../containers/CVUpdate/UpdateSkillsContainer';
import UpdateLanguagesContainer from '../containers/CVUpdate/UpdateLanguagesContainer';
import UpdateInterestsContainer from '../containers/CVUpdate/UpdateInterestsContainer';
import UpdateReferencesContainer from '../containers/CVUpdate/UpdateReferencesContainer';

// setup tab data constants
export const tabData = [
	{ key: 'basics', label: 'Détails' },
	{ key: 'work', label: 'Expérience professionnelle' },
	{ key: 'volunteer', label: 'Expérience associative' },
	{ key: 'education', label: 'Formation' },
	{ key: 'projects', label: 'Projets' },
	{ key: 'skills', label: 'Compétences' },
	{ key: 'languages', label: 'Langues' },
	{ key: 'interests', label: "Centre d'intérêts" },
	{ key: 'references', label: 'Références' }
];

// setup tabs
const tabs = tabData.map(({ key, label }) => (
	<Tab label={label} value={key} key={key} />
));

/**
 * create the list of update components
 * @param {object} resume the resume
 * @param {function} setForm the form updater function
 * @returns the object with the update component
 */
const components = (resume, setForm) => ({
	basics: <UpdateBasicsContainer basics={resume.basics} setForm={setForm} />,
	work: <UpdateWorkContainer work={resume.work} setForm={setForm} />,
	volunteer: (
		<UpdateVolunteerContainer
			volunteer={resume.volunteer}
			setForm={setForm}
		/>
	),
	education: (
		<UpdateEducationContainer
			education={resume.education}
			setForm={setForm}
		/>
	),
	projects: (
		<UpdateProjectsContainer projects={resume.projects} setForm={setForm} />
	),
	skills: <UpdateSkillsContainer skills={resume.skills} setForm={setForm} />,
	languages: (
		<UpdateLanguagesContainer
			languages={resume.languages}
			setForm={setForm}
		/>
	),
	interests: (
		<UpdateInterestsContainer
			interests={resume.interests}
			setForm={setForm}
		/>
	),
	references: (
		<UpdateReferencesContainer
			references={resume.references}
			setForm={setForm}
		/>
	)
});

/**
 * setup the tabs content
 * @param {object} components the list of components
 * @returns the list of tab content
 */
const tabContent = components =>
	tabData.map(({ key }) => (
		<Box width="100%" clone key={key}>
			<TabPanel value={key}>
				<Box display="flex" justifyContent="center">
					{components[key]}
				</Box>
			</TabPanel>
		</Box>
	));

// configure the prop types validation
CVUpdate.propTypes = {
	resume: PropTypes.shape({
		resume: PropTypes.object.isRequired,
		isLoading: PropTypes.bool.isRequired,
		error: PropTypes.string
	}).isRequired,
	currentTab: PropTypes.string.isRequired,
	nextTab: PropTypes.string,
	handleNextTabChange: PropTypes.func.isRequired,
	handleTabChange: PropTypes.func.isRequired,
	handleClose: PropTypes.func.isRequired,
	setForm: PropTypes.func.isRequired
};

function CVUpdate({
	resume: { resume, isLoading, error },
	currentTab,
	nextTab,
	handleNextTabChange,
	handleTabChange,
	handleClose,
	setForm
}) {
	return (
		<Fragment>
			<Header
				title={`Modifier le CV : ${
					resume.languageCode !== undefined
						? resume.languageCode.toUpperCase()
						: ''
				}`}
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
							{`Modifier le CV : ${
								resume.languageCode !== undefined
									? resume.languageCode.toUpperCase()
									: ''
							}`}
						</Typography>
						{isLoading ? (
							<Loading size="40vh" />
						) : error !== null ? (
							<Error size="40vh">
								Impossible de charger les données
							</Error>
						) : (
							<Fragment>
								<TabContext value={currentTab}>
									<AppBar position="static" color="default">
										<TabList
											onChange={handleNextTabChange}
											indicatorColor="primary"
											textColor="primary"
											variant="scrollable"
											scrollButtons="auto"
										>
											{tabs}
										</TabList>
									</AppBar>
									{tabContent(components(resume, setForm))}
								</TabContext>
								<Dialog
									open={nextTab !== null}
									onClose={handleClose}
									aria-labelledby="alert-dialog-title"
									aria-describedby="alert-dialog-description"
								>
									<DialogTitle id="alert-dialog-title">
										Avez-vous sauvegardé votre modification
										?
									</DialogTitle>
									<DialogContent>
										<DialogContentText id="alert-dialog-description">
											Avant de changer d'onglet, nous vous
											conseillons de sauvegarder les
											modifications, sinon elles seront
											perdues.
										</DialogContentText>
									</DialogContent>
									<DialogActions>
										<Button
											onClick={handleClose}
											color="primary"
											autoFocus
										>
											Revenir aux modifications
										</Button>
										<Button
											onClick={handleTabChange}
											color="primary"
										>
											Continuer
										</Button>
									</DialogActions>
								</Dialog>
							</Fragment>
						)}
					</Paper>
				</Box>
			</Container>
		</Fragment>
	);
}

export default CVUpdate;
