import { PropTypes } from 'prop-types';
import React from 'react';

import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select
} from '@material-ui/core';

// setup fields types constants
export const SELECT = 'select';

// configure the prop types validation
SelectField.propTypes = {
	form: PropTypes.objectOf(
		PropTypes.oneOfType([
			PropTypes.shape({
				value: PropTypes.any,
				error: PropTypes.string.isRequired
			}),
			PropTypes.array,
			PropTypes.number
		])
	).isRequired,
	template: PropTypes.shape({
		name: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		configParam: PropTypes.object
	}).isRequired,
	handleForm: PropTypes.shape({
		onChange: PropTypes.func.isRequired,
		onBlur: PropTypes.func.isRequired
	}).isRequired,
	autoSubmit: PropTypes.func.isRequired,
	preName: PropTypes.string
};

function SelectField({
	form,
	template: { name, label, configParam },
	handleForm: { onChange, onBlur },
	autoSubmit,
	preName
}) {
	return (
		<FormControl error={form[name].error !== ''} required>
			<InputLabel
				id={`${
					preName !== undefined ? `${preName}_` : ''
				}${name}-label`}
			>
				{label}
			</InputLabel>
			<Select
				labelId={`${
					preName !== undefined ? `${preName}_` : ''
				}${name}-label`}
				id={`${preName !== undefined ? `${preName}_` : ''}${name}`}
				value={form[name].value}
				onChange={onChange(name)}
				onBlur={onBlur(name)}
				onKeyPress={autoSubmit}
				required
			>
				{configParam.fields.map(field => (
					<MenuItem value={field} key={field}>
						{field}
					</MenuItem>
				))}
			</Select>
			<FormHelperText>{form[name].error}</FormHelperText>
		</FormControl>
	);
}

export default SelectField;
