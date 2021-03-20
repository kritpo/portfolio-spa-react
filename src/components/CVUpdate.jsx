import { AppBar, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Tab, Typography } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { PropTypes } from 'prop-types';
import React, { Fragment } from 'react';

import UpdateBasicsContainer from '../containers/CVUpdate/UpdateBasicsContainer';
import UpdateEducationContainer from '../containers/CVUpdate/UpdateEducationContainer';
import UpdateInterestsContainer from '../containers/CVUpdate/UpdateInterestsContainer';
import UpdateLanguagesContainer from '../containers/CVUpdate/UpdateLanguagesContainer';
import UpdateProjectsContainer from '../containers/CVUpdate/UpdateProjectsContainer';
import UpdateReferencesContainer from '../containers/CVUpdate/UpdateReferencesContainer';
import UpdateSkillsContainer from '../containers/CVUpdate/UpdateSkillsContainer';
import UpdateVolunteerContainer from '../containers/CVUpdate/UpdateVolunteerContainer';
import UpdateWorkContainer from '../containers/CVUpdate/UpdateWorkContainer';
import { CV_LIST, HOME } from '../routes';
import Error from '../utils/Error';
import languages from '../utils/languages';
import Loading from '../utils/Loading';
import Header from './Header';

/**
 * setup tabs
 * @param {array} tabData the list of tab
 * @returns the list of tab components
 */
const tabs = tabData =>
	tabData.map(({ key, label }) => (
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
 * @param {array} tabData the list of tab
 * @returns the list of tab content
 */
const tabContent = (components, tabData) =>
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
	setForm: PropTypes.func.isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function CVUpdate({
	resume: { resume, isLoading, error },
	currentTab,
	nextTab,
	handleNextTabChange,
	handleTabChange,
	handleClose,
	setForm,
	language: { systemLanguageCode }
}) {
	return (
		<Fragment>
			<Header
				title={`${languages[systemLanguageCode].pages.cvUpdate} : ${
					resume.languageCode !== undefined
						? resume.languageCode.toUpperCase()
						: ''
				}`}
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
							{`${
								languages[systemLanguageCode].pages.cvUpdate
							} : ${
								resume.languageCode !== undefined
									? resume.languageCode.toUpperCase()
									: ''
							}`}
						</Typography>
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
								<TabContext value={currentTab}>
									<AppBar position="static" color="default">
										<TabList
											onChange={handleNextTabChange}
											indicatorColor="primary"
											textColor="primary"
											variant="scrollable"
											scrollButtons="auto"
										>
											{tabs(
												languages[systemLanguageCode]
													.cvUpdate.tabData
											)}
										</TabList>
									</AppBar>
									{tabContent(
										components(resume, setForm),
										languages[systemLanguageCode].cvUpdate
											.tabData
									)}
								</TabContext>
								<Dialog
									open={nextTab !== null}
									onClose={handleClose}
									aria-labelledby="alert-dialog-title"
									aria-describedby="alert-dialog-description"
								>
									<DialogTitle id="alert-dialog-title">
										{
											languages[systemLanguageCode]
												.cvUpdate.changeTabDialog.title
										}
									</DialogTitle>
									<DialogContent>
										<DialogContentText id="alert-dialog-description">
											{
												languages[systemLanguageCode]
													.cvUpdate.changeTabDialog
													.content
											}
										</DialogContentText>
									</DialogContent>
									<DialogActions>
										<Button
											onClick={handleClose}
											color="primary"
											autoFocus
										>
											{
												languages[systemLanguageCode]
													.cvUpdate.changeTabDialog
													.cancel
											}
										</Button>
										<Button
											onClick={handleTabChange}
											color="primary"
										>
											{
												languages[systemLanguageCode]
													.cvUpdate.changeTabDialog
													.continue
											}
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
