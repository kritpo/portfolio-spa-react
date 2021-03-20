import { Box, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { PropTypes } from 'prop-types';
import React, { Fragment, useCallback } from 'react';
import ReactCountryFlag from 'react-country-flag';
import COUNTRY_CONST from '../../languages/countryConst';

// setup fields types constants
export const COUNTRY_CODE = 'country_code';

// retrieve all country constants
const countries = Object.entries(COUNTRY_CONST).reduce(
	(array, [, country]) => [...array, country],
	[]
);

// configure the prop types validation
CountryCodeField.propTypes = {
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
	handleForm: PropTypes.shape({
		onChange: PropTypes.func.isRequired
	}).isRequired,
	autoSubmit: PropTypes.func.isRequired,
	preName: PropTypes.string
};

function CountryCodeField({
	form,
	template: { name, label, inputParam = {} },
	handleForm: { onChange },
	autoSubmit,
	preName
}) {
	// setup local onChange
	const autocompleteOnChange = useCallback(
		(event, country) => {
			// check if the country is defined
			if (country) {
				// update the country code
				onChange(name)({ target: { value: country.countryCode } });
			}
		},
		[name, onChange]
	);

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

	// setup the option label retriever
	const getOptionLabel = useCallback(
		({ countryCode, country }) => `${countryCode}-${country}`,
		[]
	);

	// setup the option render
	const renderOption = useCallback(
		({ countryCode, country }) => (
			<Fragment>
				<ReactCountryFlag countryCode={countryCode} svg />
				<Typography>
					{countryCode}-{country}
				</Typography>
			</Fragment>
		),
		[]
	);

	// retrieve the value
	const value = COUNTRY_CONST[form[name].value];

	return (
		<Box mt={2}>
			<Autocomplete
				id={`${preName !== undefined ? `${preName}_` : ''}${name}`}
				value={value !== undefined ? value : COUNTRY_CONST.FR}
				onChange={autocompleteOnChange}
				options={countries}
				getOptionLabel={getOptionLabel}
				renderOption={renderOption}
				renderInput={renderInput}
				autoHighlight
			/>
		</Box>
	);
}

export default CountryCodeField;
