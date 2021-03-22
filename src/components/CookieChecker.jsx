import { PropTypes } from 'prop-types';
import React from 'react';

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@material-ui/core';

import languages from '../utils/languages';

// configure the prop types validation
CookieChecker.propTypes = {
	open: PropTypes.bool.isRequired,
	handleAgree: PropTypes.func.isRequired,
	handleDisagree: PropTypes.func.isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function CookieChecker({
	open,
	handleAgree,
	handleDisagree,
	language: { systemLanguageCode }
}) {
	return (
		<Dialog
			open={open}
			aria-labelledby="cookie-check-alert-dialog-title"
			aria-describedby="cookie-check-alert-dialog-description"
			onClose={handleDisagree}
			disableBackdropClick
			disableEscapeKeyDown
		>
			<DialogTitle id="cookie-check-alert-dialog-title">
				{languages[systemLanguageCode].cookieChecker.title}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="cookie-check-alert-dialog-description">
					{languages[systemLanguageCode].terms.content.cookies}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleDisagree} color="primary">
					{languages[systemLanguageCode].cookieChecker.disagree}
				</Button>
				<Button onClick={handleAgree} color="primary" autoFocus>
					{languages[systemLanguageCode].cookieChecker.agree}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default CookieChecker;
