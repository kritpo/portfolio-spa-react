import { PropTypes } from 'prop-types';
import React, { Fragment, useCallback } from 'react';

import { Typography } from '@material-ui/core';

import LANGUAGE_CONST from '../../languages/languageConst';
import AutocompleteField from './MasterField/AutocompleteField';

// setup fields types constants
export const LANGUAGE_CODE = 'language_code';

// retrieve all language constants
const languages = Object.entries(LANGUAGE_CONST).reduce(
	(array, [, language]) => [...array, language],
	[]
);

// configure the prop types validation
LanguageCodeField.propTypes = {
	form: PropTypes.object.isRequired,
	template: PropTypes.object.isRequired,
	handleForm: PropTypes.shape({
		onChange: PropTypes.func.isRequired
	}).isRequired,
	autoSubmit: PropTypes.func.isRequired,
	preName: PropTypes.string
};

function LanguageCodeField({
	form,
	template,
	handleForm: { onChange },
	autoSubmit,
	preName
}) {
	// setup local onChange
	const autocompleteOnChange = useCallback(
		(event, language) => {
			// check if the language is defined
			if (language) {
				// update the language code
				onChange(template.name)({
					target: { value: language.languageCode }
				});
			}
		},
		[template.name, onChange]
	);

	// setup the option label retriever
	const getOptionLabel = useCallback(
		({ languageCode, language }) => `${languageCode}-${language}`,
		[]
	);

	// setup the option render
	const renderOption = useCallback(
		({ languageCode, language }) => (
			<Fragment>
				<Typography>
					{languageCode}-{language}
				</Typography>
			</Fragment>
		),
		[]
	);

	// retrieve the value
	const value =
		LANGUAGE_CONST[form[template.name].value] !== undefined
			? LANGUAGE_CONST[form[template.name].value]
			: { languageCode: '', language: '' };

	return (
		<AutocompleteField
			form={form}
			template={template}
			autoSubmit={autoSubmit}
			preName={preName}
			value={value}
			onChange={autocompleteOnChange}
			options={languages}
			getOptionLabel={getOptionLabel}
			renderOption={renderOption}
		/>
	);
}

export default LanguageCodeField;
