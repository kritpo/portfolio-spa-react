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
 * reduce data into a form data
 * @param {array} data the default data
 * @returns the final form
 */
const setupForm = formData =>
	formData.reduce(
		(object, { name, payload }) => ({
			...object,
			[name]:
				typeof payload !== 'object'
					? {
							value: payload,
							error: '',
							triggered: false
					  }
					: Array.isArray(payload)
					? payload.map(subformData => setupForm(subformData))
					: undefined
		}),
		{}
	);

/**
 * check if a form contains errors
 * @param {object} form the form to check
 * @param {object} template the form template
 * @param {function} setForm the form setter
 * @returns if the form contains errors
 */
const checkError = (form, template, setForm) => {
	// initialize the error status
	let errors = false;

	// retrieve a copy of the form
	const formCopy = { ...form };

	// loop all fields
	for (const fieldName in formCopy) {
		// retrieve the current field
		const field = formCopy[fieldName];

		// check if the field is not an array
		if (!Array.isArray(field)) {
			// retrieve the error
			const error = template[fieldName].checkField(field.value);

			// check if the field is correct
			errors = errors || error !== '';

			// update the form
			field.error = error;
			field.triggered = true;
		} else {
			// otherwise check the sub form
			for (let i = 0; i < field.length; i++) {
				// setup the subform setter
				const setSubform = newSubform => {
					// update the form copy
					field[i] = newSubform;
				};

				// check if the subform is correct
				const nextErrors = checkError(
					field[i],
					template[fieldName].subform,
					setSubform
				);
				errors = errors || nextErrors;
			}
		}
	}

	// replace the form by the updated copy with errors
	setForm(formCopy);

	return errors;
};

// configure the prop types validation
Form.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			payload: PropTypes.any.isRequired
		})
	).isRequired,
	template: PropTypes.objectOf(
		PropTypes.oneOfType([
			PropTypes.shape({
				checkField: PropTypes.func.isRequired
			}),
			PropTypes.shape({
				subform: PropTypes.object.isRequired
			})
		])
	).isRequired,
	onSubmit: PropTypes.func.isRequired,
	errorMessage: PropTypes.string.isRequired,
	action: PropTypes.string.isRequired,
	setForm: PropTypes.func
};

function Form({
	children,
	data,
	template,
	onSubmit,
	errorMessage,
	action,
	setForm: setExtForm
}) {
	// setup a recaptcha hook
	const { executeRecaptcha } = useGoogleReCaptcha();

	// setup form states
	const [form, setIntForm] = useState(setupForm(data));
	const [isSending, setIsSending] = useState(false);
	const [error, setError] = useState('');

	// setup the form setter
	const setForm = useCallback(
		newForm => {
			// set the inner form
			setIntForm(newForm);

			// set the extern form
			if (setExtForm !== undefined) {
				setExtForm(newForm);
			}
		},
		[setExtForm]
	);

	// setup the form submit handler
	const handleSubmit = useCallback(() => {
		// reset the error message
		setError('');

		// check if the form is correct
		if (!checkError(form, template, setIntForm)) {
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
	}, [errorMessage, executeRecaptcha, form, onSubmit, template]);

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
					form={form}
					setForm={setForm}
					template={template}
					autoSubmit={autoSubmit}
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
