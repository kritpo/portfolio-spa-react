import React from 'react';
import { PropTypes } from 'prop-types';

import { CV_UPDATE } from '../../routes';

import { Box, TableRow, TableCell, Button, Chip } from '@material-ui/core';
import { Create, Delete, FirstPage } from '@material-ui/icons';

import CustomLink from '../../utils/CustomLink';

// configure the prop types validation
LanguageItem.propTypes = {
	defaultLanguage: PropTypes.PropTypes.shape({
		languageCode: PropTypes.string.isRequired,
		language: PropTypes.string.isRequired
	}).isRequired,
	languageCode: PropTypes.string.isRequired,
	language: PropTypes.string.isRequired
};

function LanguageItem({ defaultLanguage, languageCode, language }) {
	return (
		<TableRow key={languageCode}>
			<TableCell component="th" scope="row">
				{languageCode}
				{defaultLanguage.languageCode === languageCode && (
					<Box m={1} clone>
						<Chip label="Par défaut" color="primary" />
					</Box>
				)}
			</TableCell>
			<TableCell align="center">{language}</TableCell>
			<TableCell align="center">
				<CustomLink to={`${CV_UPDATE}?languageCode=${languageCode}`}>
					<Box m={2} clone>
						<Box m={2} clone>
							<Button
								variant="contained"
								color="secondary"
								startIcon={<Create />}
							>
								Modifier
							</Button>
						</Box>
					</Box>
				</CustomLink>
				<Box m={2} clone>
					<Button
						variant="contained"
						color="secondary"
						startIcon={<Delete />}
					>
						Supprimer
					</Button>
				</Box>
				{defaultLanguage.languageCode !== languageCode && (
					<Box m={2} clone>
						<Button
							variant="contained"
							color="secondary"
							startIcon={<FirstPage />}
						>
							Mettre par défaut
						</Button>
					</Box>
				)}
			</TableCell>
		</TableRow>
	);
}

export default LanguageItem;
