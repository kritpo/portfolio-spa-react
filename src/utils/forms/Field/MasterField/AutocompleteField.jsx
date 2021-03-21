import { PropTypes } from 'prop-types';
import React, { useCallback } from 'react';

import { Box, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

// configure the prop types validation
AutoCompleteField.propTypes = {
	form: PropTypes.objectOf(
		PropTypes.oneOfType([
			PropTypes.shape({
				value: PropTypes.any,
				error: PropTypes.string.isRequired
			}),
			PropTypes.array
		])
	).isRequired,
	template: PropTypes.shape({
		name: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		inputParam: PropTypes.object
	}).isRequired,
	autoSubmit: PropTypes.func.isRequired,
	preName: PropTypes.string,
	value: PropTypes.any.isRequired,
	onChange: PropTypes.func.isRequired,
	options: PropTypes.array.isRequired,
	getOptionLabel: PropTypes.func.isRequired,
	renderOption: PropTypes.func.isRequired
};

function AutoCompleteField({
	form,
	template: { name, label, inputParam = {} },
	autoSubmit,
	preName,
	value,
	onChange,
	options,
	getOptionLabel,
	renderOption
}) {
	// setup input render
	const renderInput = useCallback(
		params => (
			<TextField
				{...params}
				variant="outlined"
				label={label}
				helperText={form[name].error}
				error={form[name].error !== ''}
				onKeyPress={autoSubmit}
				fullWidth
				required
				inputProps={{
					...params.inputProps,
					autoComplete: 'new-password'
				}}
				{...inputParam}
			/>
		),
		[autoSubmit, form, inputParam, label, name]
	);

	return (
		<Box mt={2}>
			<Autocomplete
				id={`${preName !== undefined ? `${preName}_` : ''}${name}`}
				value={value}
				onChange={onChange}
				options={options}
				getOptionLabel={getOptionLabel}
				renderOption={renderOption}
				renderInput={renderInput}
				autoHighlight
			/>
		</Box>
	);
}

export default AutoCompleteField;
