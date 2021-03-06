import { PropTypes } from 'prop-types';
import React, { Fragment } from 'react';

import {
	Box,
	Button,
	Container,
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from '@material-ui/core';
import { Add, Visibility } from '@material-ui/icons';

import LanguageItemContainer from '../containers/CVList/LanguageItemContainer';
import { CV_CREATE, HOME, PORTFOLIO } from '../routes';
import CustomLink from '../utils/CustomLink';
import Loading from '../utils/Loading';
import languages from '../utils/languages';
import Header from './Header';

/**
 * convert languages details to React component
 * @param {array} languages the list of languages data
 * @param {object} defaultLanguage the default language data
 * @returns the components array
 */
const languagesList = (languages, defaultLanguage) =>
	languages.map(({ languageCode, language }, index) => (
		<LanguageItemContainer
			defaultLanguage={defaultLanguage}
			languageCode={languageCode}
			language={language}
			key={index}
		/>
	));

// configure the prop types validation
CVList.propTypes = {
	resumeLanguages: PropTypes.shape({
		isLoading: PropTypes.bool.isRequired,
		resumeLanguages: PropTypes.object.isRequired,
		error: PropTypes.string
	}).isRequired,
	username: PropTypes.string.isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function CVList({
	resumeLanguages: { isLoading, resumeLanguages, error },
	username,
	language: { systemLanguageCode }
}) {
	return (
		<Fragment>
			<Header
				title={languages[systemLanguageCode].pages.cvList}
				history={[
					{
						link: HOME,
						title: languages[systemLanguageCode].pages.home
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
							{languages[systemLanguageCode].pages.cvList}
						</Typography>
						{isLoading ? (
							<Loading size="40vh" />
						) : (
							<Fragment>
								<TableContainer component={Paper}>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell>
													{
														languages[
															systemLanguageCode
														].cvList.languageCode
													}
												</TableCell>
												<TableCell align="center">
													{
														languages[
															systemLanguageCode
														].cvList.language
													}
												</TableCell>
												<TableCell align="center">
													{
														languages[
															systemLanguageCode
														].cvList.actions
													}
												</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{resumeLanguages.languages.length >
											0 ? (
												languagesList(
													resumeLanguages.languages,
													resumeLanguages.defaultLanguage
												)
											) : (
												<TableRow>
													<TableCell
														align="center"
														colSpan={3}
													>
														{
															languages[
																systemLanguageCode
															].cvList.noElements
														}
													</TableCell>
												</TableRow>
											)}
										</TableBody>
									</Table>
								</TableContainer>
								<Box mt={2}>
									<Grid
										container
										spacing={2}
										justify="center"
									>
										<Grid item>
											<CustomLink to={CV_CREATE}>
												<Button
													variant="contained"
													color="secondary"
													startIcon={<Add />}
												>
													{
														languages[
															systemLanguageCode
														].cvList.create
													}
												</Button>
											</CustomLink>
										</Grid>
										{resumeLanguages.languages.length >
											0 && (
											<Grid item>
												<CustomLink
													to={PORTFOLIO.replace(
														':username',
														username
													)}
												>
													<Button
														variant="contained"
														color="secondary"
														startIcon={
															<Visibility />
														}
													>
														{
															languages[
																systemLanguageCode
															].cvList.see
														}
													</Button>
												</CustomLink>
											</Grid>
										)}
									</Grid>
								</Box>
							</Fragment>
						)}
					</Paper>
				</Box>
			</Container>
		</Fragment>
	);
}

export default CVList;
