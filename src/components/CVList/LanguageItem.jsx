import React from 'react';
import { PropTypes } from 'prop-types';

import { CV_UPDATE } from '../../routes';
import languages from '../../utils/languages';

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
	onDelete: PropTypes.func.isRequired,
	setDefault: PropTypes.func.isRequired,
	languageState: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function LanguageItem({
	defaultLanguage,
	languageCode,
	language,
	deletePending,
	handleClose,
	onDeletePending,
	onDelete,
	setDefault,
	languageState: { systemLanguageCode }
}) {
	return (
		<TableRow key={languageCode}>
			<TableCell component="th" scope="row">
				{languageCode}
				{defaultLanguage.languageCode === languageCode && (
					<Box m={1} clone>
						<Chip
							label={languages[systemLanguageCode].cvList.default}
							color="primary"
						/>
					</Box>
				)}
			</TableCell>
			<TableCell align="center">{language}</TableCell>
			<TableCell align="center">
				<CustomLink to={`${CV_UPDATE}?languageCode=${languageCode}`}>
					<Box mx={2} my={1} clone>
						<Button
							variant="contained"
							color="secondary"
							startIcon={<Create />}
						>
							{languages[systemLanguageCode].cvList.update}
						</Button>
					</Box>
				</CustomLink>
				<Box mx={2} my={1} clone>
					<Button
						variant="contained"
						color="secondary"
						startIcon={<Delete />}
						onClick={onDeletePending}
					>
						{languages[systemLanguageCode].cvList.delete}
					</Button>
				</Box>
				{defaultLanguage.languageCode !== languageCode && (
					<Box mx={2} my={1} clone>
						<Button
							variant="contained"
							color="secondary"
							startIcon={<FirstPage />}
							onClick={setDefault(languageCode)}
						>
							{languages[systemLanguageCode].cvList.setDefault}
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
						{languages[
							systemLanguageCode
						].cvList.deleteDialog.title(language)}
					</DialogTitle>
					<DialogContent>
						<DialogContentText
							id={`alert-dialog-description-${languageCode}`}
						>
							{languages[
								systemLanguageCode
							].cvList.deleteDialog.content(language)}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary" autoFocus>
							{
								languages[systemLanguageCode].cvList
									.deleteDialog.cancel
							}
						</Button>
						<Button onClick={onDelete} color="primary">
							{
								languages[systemLanguageCode].cvList
									.deleteDialog.confirm
							}
						</Button>
					</DialogActions>
				</Dialog>
			</TableCell>
		</TableRow>
	);
}

export default LanguageItem;
