import { PropTypes } from 'prop-types';
import React from 'react';

import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormHelperText
} from '@material-ui/core';

// setup fields types constants
export const CHECKBOX = 'checkbox';

// configure the prop types validation
CheckboxField.propTypes = {
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
		label: PropTypes.string.isRequired
	}).isRequired,
	handleForm: PropTypes.shape({
		onChange: PropTypes.func.isRequired
	}).isRequired,
	autoSubmit: PropTypes.func.isRequired
};

function CheckboxField({
	form,
	template: { name, label },
	handleForm: { onChange },
	autoSubmit
}) {
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
}

export default CheckboxField;
