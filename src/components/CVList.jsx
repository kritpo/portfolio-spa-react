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
	languages: PropTypes.shape({
		defaultLanguage: PropTypes.object.isRequired,
		languages: PropTypes.arrayOf(
			PropTypes.shape({
				languageCode: PropTypes.string.isRequired,
				language: PropTypes.string.isRequired
			})
		).isRequired
	}).isRequired,
	username: PropTypes.string.isRequired
};

function User({ languages: { defaultLanguage, languages }, username }) {
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
						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Code langue</TableCell>
										<TableCell align="center">
											Langue
										</TableCell>
										<TableCell align="center">
											Actions
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{languages.length > 0 ? (
										languagesList(
											languages,
											defaultLanguage
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
							{languages.length > 0 && (
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
					</Paper>
				</Box>
			</Container>
		</Fragment>
	);
}

export default User;
