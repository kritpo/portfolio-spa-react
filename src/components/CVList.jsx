import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { HOME, PORTFOLIO, CV_CREATE } from '../routes';

import {
	Container,
	Box,
	Paper,
	Typography,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Button
} from '@material-ui/core';
import { Add, Visibility } from '@material-ui/icons';

import Header from './Header';
import Loading from '../utils/Loading';
import Error from '../utils/Error';
import CustomLink from '../utils/CustomLink';
import LanguageItemContainer from '../containers/CVList/LanguageItemContainer';

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
User.propTypes = {
	resumeLanguages: PropTypes.shape({
		isLoading: PropTypes.bool.isRequired,
		resumeLanguages: PropTypes.object.isRequired,
		error: PropTypes.string
	}).isRequired,
	username: PropTypes.string.isRequired
};

function User({
	resumeLanguages: { isLoading, resumeLanguages, error },
	username
}) {
	return (
		<Fragment>
			<Header title="CVs" history={[{ link: HOME, title: 'Accueil' }]} />
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
							CVs
						</Typography>
						{isLoading ? (
							<Loading size="40vh" />
						) : error !== null ? (
							<Error size="40vh">
								Impossible de charger les données
							</Error>
						) : (
							<Fragment>
								<TableContainer component={Paper}>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell>
													Code langue
												</TableCell>
												<TableCell align="center">
													Langue
												</TableCell>
												<TableCell align="center">
													Actions
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
														Aucun CV
													</TableCell>
												</TableRow>
											)}
										</TableBody>
									</Table>
								</TableContainer>
								<Box>
									<CustomLink to={CV_CREATE}>
										<Box m={2} clone>
											<Button
												variant="contained"
												color="secondary"
												startIcon={<Add />}
											>
												Créer
											</Button>
										</Box>
									</CustomLink>
									{resumeLanguages.languages.length > 0 && (
										<CustomLink
											to={PORTFOLIO.replace(
												':username',
												username
											)}
										>
											<Box m={2} clone>
												<Button
													variant="contained"
													color="secondary"
													startIcon={<Visibility />}
												>
													Voir
												</Button>
											</Box>
										</CustomLink>
									)}
								</Box>
							</Fragment>
						)}
					</Paper>
				</Box>
			</Container>
		</Fragment>
	);
}

export default User;
