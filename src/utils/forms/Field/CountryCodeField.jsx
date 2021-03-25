import { PropTypes } from 'prop-types';
import React, { Fragment, useCallback } from 'react';
import ReactCountryFlag from 'react-country-flag';

import { Typography } from '@material-ui/core';

import COUNTRY_CONST from '../../languages/countryConst';
import AutocompleteField from './MasterField/AutocompleteField';

// setup fields types constants
export const COUNTRY_CODE = 'country_code';

// retrieve all country constants
const countries = Object.entries(COUNTRY_CONST).reduce(
	(array, [, country]) => [...array, country],
	[]
);

// configure the prop types validation
CountryCodeField.propTypes = {
	form: PropTypes.object.isRequired,
	template: PropTypes.object.isRequired,
	handleForm: PropTypes.shape({
		onChange: PropTypes.func.isRequired
	}).isRequired,
	autoSubmit: PropTypes.func.isRequired,
	preName: PropTypes.string
};

function CountryCodeField({
	form,
	template,
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
				onChange(template.name)({
					target: { value: country.countryCode }
				});
			}
		},
		[template.name, onChange]
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
	const value =
		COUNTRY_CONST[form[template.name].value] !== undefined
			? COUNTRY_CONST[form[template.name].value]
			: { countryCode: '', country: '' };

	return (
		<AutocompleteField
			form={form}
			template={template}
			autoSubmit={autoSubmit}
			preName={preName}
			value={value}
			onChange={autocompleteOnChange}
			options={countries}
			getOptionLabel={getOptionLabel}
			renderOption={renderOption}
		/>
	);
}

export default CountryCodeField;
