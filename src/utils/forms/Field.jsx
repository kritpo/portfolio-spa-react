import React from 'react';
import { PropTypes } from 'prop-types';

import {
	FormControl,
	FormControlLabel,
	FormHelperText,
	TextField,
	Checkbox
} from '@material-ui/core';

// setup fields types constants
export const TEXT = 'text';
export const EMAIL = 'email';
export const PASSWORD = 'password';
export const CHECKBOX = 'checkbox';

// configure the prop types validation
Field.propTypes = {
	field: PropTypes.shape({
		name: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired
	}).isRequired,
	form: PropTypes.objectOf(
		PropTypes.shape({
			value: PropTypes.isRequired,
			error: PropTypes.string.isRequired
		})
	).isRequired,
	handleForm: PropTypes.shape({
		onChange: PropTypes.func.isRequired,
		onBlur: PropTypes.func.isRequired
	}).isRequired,
	autoSubmit: PropTypes.func.isRequired,
	preName: PropTypes.string.isRequired
};

function Field({
	field: { name, type, label, ...field },
	form,
	handleForm: { onChange, onBlur },
	autoSubmit,
	preName
}) {
	// check the type of the field
	switch (type) {
		// if the field must be a text, a email or a password field
		case TEXT:
		case EMAIL:
		case PASSWORD:
			return (
				<TextField
					id={`${preName}_${name}`}
					type={type}
					label={label}
					value={form[name].value}
					helperText={form[name].error}
					onChange={onChange(name)}
					onBlur={onBlur(name)}
					error={form[name].error !== ''}
					onKeyPress={autoSubmit}
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
								onChange={onChange(name, true)}
								onKeyPress={autoSubmit}
								required
							/>
						}
						label={label}
					/>
					<FormHelperText>{form[name].error}</FormHelperText>
				</FormControl>
			);

		default:
			return null;
	}
}

export default Field;
