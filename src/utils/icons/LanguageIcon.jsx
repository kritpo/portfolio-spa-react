import React, { useMemo, Fragment } from 'react';
import { PropTypes } from 'prop-types';

import languages from './languages';

import ReactCountryFlag from 'react-country-flag';

// configure the prop types validation
LanguageIcon.propTypes = {
	language: PropTypes.string.isRequired
};

function LanguageIcon({ language }) {
	// normalize the language
	const lang = useMemo(() => language.toLowerCase(), [language]);

	// retrieve the country code associated to the language
	const finalLanguage = useMemo(
		() =>
			languages.find(({ keyword }) => {
				// retrieve the language associated in keywords
				const foundedKeyword = keyword.find(key => lang.includes(key));

				// return if a keyword is retrieved, which will mean that the current language is the one wanted
				return foundedKeyword !== undefined;
			}),
		[lang]
	);

	return (
		<Fragment>
			{finalLanguage !== undefined ? (
				<ReactCountryFlag
					countryCode={finalLanguage.countryCode}
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
