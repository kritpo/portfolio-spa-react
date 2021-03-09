import React, { useMemo, Fragment } from 'react';
import { PropTypes } from 'prop-types';

import languages from './languages';

import ReactCountryFlag from 'react-country-flag';

/**
 * retrieve the language object
 * @param {string} language the language name
 * @returns the language object
 */
const retrieveLanguage = language => {
	// normalize the language
	const lang = language.toLowerCase();

	// retrieve the language object associated to the language
	const languageObject = languages.find(({ keyword }) => {
		// retrieve the language associated in keywords
		const foundedKeyword = keyword.find(key => lang.includes(key));

		// return if a keyword is retrieved, which will mean that the current language is the one wanted
		return foundedKeyword !== undefined;
	});

	return languageObject !== undefined ? languageObject : {};
};

// configure the prop types validation
LanguageIcon.propTypes = {
	language: PropTypes.string.isRequired
};

function LanguageIcon({ language }) {
	// retrieve the country code associated to the language
	const { countryCode } = useMemo(() => retrieveLanguage(language), [
		language
	]);

	return (
		<Fragment>
			{countryCode !== undefined ? (
				<ReactCountryFlag
					countryCode={countryCode}
					title={language}
					svg
				/>
			) : (
				language
			)}
		</Fragment>
	);
}

export default LanguageIcon;
