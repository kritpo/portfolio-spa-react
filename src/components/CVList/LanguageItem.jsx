import React from 'react';
import { PropTypes } from 'prop-types';

import { CV_UPDATE } from '../../routes';

import {
	Box,
	TableRow,
	TableCell,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	Chip
} from '@material-ui/core';
import { Create, Delete, FirstPage } from '@material-ui/icons';

import CustomLink from '../../utils/CustomLink';

// configure the prop types validation
LanguageItem.propTypes = {
	defaultLanguage: PropTypes.PropTypes.shape({
		languageCode: PropTypes.string.isRequired,
		language: PropTypes.string.isRequired
	}).isRequired,
	languageCode: PropTypes.string.isRequired,
	language: PropTypes.string.isRequired,
	deletePending: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	onDeletePending: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired
};

function LanguageItem({
	defaultLanguage,
	languageCode,
	language,
	deletePending,
	handleClose,
	onDeletePending,
	onDelete
}) {
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
					<Box mx={2} clone>
						<Button
							variant="contained"
							color="secondary"
							startIcon={<Create />}
						>
							Modifier
						</Button>
					</Box>
				</CustomLink>
				<Box mx={2} clone>
					<Button
						variant="contained"
						color="secondary"
						startIcon={<Delete />}
						onClick={onDeletePending}
					>
						Supprimer
					</Button>
				</Box>
				{defaultLanguage.languageCode !== languageCode && (
					<Box mx={2} clone>
						<Button
							variant="contained"
							color="secondary"
							startIcon={<FirstPage />}
						>
							Mettre par défaut
						</Button>
					</Box>
				)}
				<Dialog
					open={deletePending}
					onClose={handleClose}
					aria-labelledby={`alert-dialog-title-${languageCode}`}
					aria-describedby={`alert-dialog-description-${languageCode}`}
				>
					<DialogTitle id={`alert-dialog-title-${languageCode}`}>
						Supprimer le CV {language}
					</DialogTitle>
					<DialogContent>
						<DialogContentText
							id={`alert-dialog-description-${languageCode}`}
						>
							Souhaitez-vous réellement supprimer le CV {language}
							? Cette action est irreversible!
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary" autoFocus>
							Annuler
						</Button>
						<Button onClick={onDelete} color="primary">
							Confirmer
						</Button>
					</DialogActions>
				</Dialog>
			</TableCell>
		</TableRow>
	);
}

export default LanguageItem;
