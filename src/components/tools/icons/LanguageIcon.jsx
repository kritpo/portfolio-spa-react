import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import languages from './languages';

import ReactCountryFlag from 'react-country-flag';

// configure the prop types validation
LanguageIcon.propTypes = {
	language: PropTypes.string.isRequired
};

function LanguageIcon({ language }) {
	// normalize the language
	const lang = language.toLowerCase();

	// retrieve the country code associated to the language
	const finalLanguage = languages.find(currentLanguage => {
		// retrieve the language associated in keywords
		const keyword = currentLanguage.keyword.find(key => lang.includes(key));

		// return if a keyword is retrieved, which will mean that the current language is the one wanted
		return keyword !== undefined;
	});

	return (
		<Fragment>
			{finalLanguage !== undefined ? (
				<ReactCountryFlag countryCode={finalLanguage.countryCode} />
			) : (
				language
			)}
		</Fragment>
	);
}

export default LanguageIcon;
