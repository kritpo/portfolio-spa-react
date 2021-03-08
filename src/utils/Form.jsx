import React from 'react';
import { PropTypes } from 'prop-types';

import {
	Box,
	Typography,
	Button,
	FormControl,
	FormControlLabel,
	FormHelperText,
	TextField,
	Checkbox
} from '@material-ui/core';

import Loading from './Loading';

// setup fields types constants
export const TEXT = 'text';
export const EMAIL = 'email';
export const PASSWORD = 'password';
export const CHECKBOX = 'checkbox';

/**
 * transform the field data to a functional field component
 * @param {object} field the field data
 * @param {object} form the list of fields data in real time, for controlled components
 * @param {object} handleForm the list of form methods, for controlled components
 * @returns the field component
 */
const transformToField = (
	{ name, type, label, ...field },
	form,
	handleForm
) => {
	// check the type of the field
	switch (type) {
		// if the field must be a text, a email or a password field
		case TEXT:
		case EMAIL:
		case PASSWORD:
			return (
				<TextField
					id={name}
					type={type}
					label={label}
					placeholder={field.placeholder}
					value={form[name].value}
					helperText={form[name].error}
					onChange={handleForm.onChange(name)}
					onBlur={handleForm.onBlur(name)}
					error={form[name].error !== ''}
					fullWidth
					required
					{...field}
				/>
			);

		// check if the field must be a checkbox field
		case CHECKBOX:
			return (
				<FormControl error={form[name].error !== ''} required>
					<FormControlLabel
						control={
							<Checkbox
								color="primary"
								checked={form[name].value}
								onChange={handleForm.onChange(name, true)}
								required
							/>
						}
						label={label}
					/>
					<FormHelperText>{form[name].error}</FormHelperText>
				</FormControl>
			);

		default:
			break;
	}
};

// configure the prop types validation
Form.propTypes = {
	fields: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			type: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
			placeholder: PropTypes.string
		})
	).isRequired,
	form: PropTypes.objectOf(
		PropTypes.shape({
			value: PropTypes.isRequired,
			error: PropTypes.string.isRequired
		})
	).isRequired,
	handleForm: PropTypes.shape({
		onChange: PropTypes.func.isRequired,
		onBlur: PropTypes.func.isRequired,
		onSubmit: PropTypes.func.isRequired
	}).isRequired,
	action: PropTypes.string.isRequired,
	error: PropTypes.string.isRequired,
	isSending: PropTypes.bool.isRequired
};

function Form({
	children,
	fields,
	form,
	handleForm,
	action,
	error,
	isSending
}) {
	// retrieve all fields
	const fieldsList = fields.map((field, index) => (
		<Box mb={2} key={index}>
			{transformToField(field, form, handleForm)}
		</Box>
	));

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
				{fieldsList}
				<FormControl error={error !== ''}>
					<Button
						variant="contained"
						color="primary"
						onClick={handleForm.onSubmit}
						disabled={form.sending}
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
