import React, { useState, useCallback } from 'react';
import { PropTypes } from 'prop-types';

import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import {
	Box,
	Typography,
	Button,
	FormControl,
	FormHelperText
} from '@material-ui/core';

import Loading from '../Loading';
import Fields from './Fields';

/**
 * check if a form contains errors
 * @param {object} form the form to check
 * @returns if the form contains errors
 */
const checkError = form => {
	// initialize the error status
	let errors = false;

	// loop all fields
	for (const fieldName in form) {
		// retrieve the current field
		const field = form[fieldName];

		// check if the field contains a field checker
		if (field.checkField !== undefined) {
			// check if the field is correct
			errors = errors || field.checkField(field.value) !== '';
		} else {
			// otherwise check the sub form
			for (const subForm of field) {
				// check if the subform is correct
				errors = errors || checkError(subForm);
			}
		}
	}

	return errors;
};

// configure the prop types validation
Form.propTypes = {
	fields: PropTypes.array.isRequired,
	onSubmit: PropTypes.func.isRequired,
	errorMessage: PropTypes.string.isRequired,
	action: PropTypes.string.isRequired
};

function Form({ children, fields, onSubmit, errorMessage, action }) {
	// setup a recaptcha hook
	const { executeRecaptcha } = useGoogleReCaptcha();

	// setup form states
	const [form, setForm] = useState({});
	const [trigger, setTrigger] = useState(false);
	const [isSending, setIsSending] = useState(false);
	const [error, setError] = useState('');

	// setup the form submit handler
	const handleSubmit = useCallback(() => {
		// reset the error message
		setError('');

		// trigger the form
		setTrigger(true);

		// check if the form is correct
		if (!checkError(form)) {
			// lock the form
			setIsSending(true);

			// setup the form unlock
			const unlockForm = () => setIsSending(false);

			// resolve the form submit promise
			onSubmit(form, executeRecaptcha(), unlockForm).catch(() => {
				// update the error message
				setError(errorMessage);

				// unlock the form
				unlockForm();
			});
		}
	}, [errorMessage, executeRecaptcha, form, onSubmit]);

	// setup the form auto submit callback
	const autoSubmit = useCallback(
		({ key }) => {
			// check if the form is active and the entered key is `Enter`
			if (!isSending && key === 'Enter') {
				// submit the form
				handleSubmit();
			}
		},
		[isSending, handleSubmit]
	);

	return (
		<Box
			display="flex"
			flexDirection="column"
			width="75%"
			minWidth="250px"
			maxWidth="400px"
			clone
		>
			<form noValidate autoComplete="off">
				<Fields
					fields={fields}
					autoSubmit={autoSubmit}
					trigger={trigger}
					setForm={setForm}
				/>
				<FormControl error={error !== ''}>
					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit}
						disabled={isSending}
					>
						{action}
					</Button>
					<FormHelperText>{error}</FormHelperText>
				</FormControl>
				<Box mt={2} textAlign="center">
					{isSending && (
						<Box mb={2}>
							<Loading size="32px" />
							<Typography variant="body1">
								Envoi en cours...
							</Typography>
						</Box>
					)}
					{children}
				</Box>
			</form>
		</Box>
	);
}

export default Form;
