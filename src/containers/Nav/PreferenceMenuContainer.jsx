import { PropTypes } from 'prop-types';
import React, { useCallback, useState } from 'react';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';

import PreferenceMenu from '../../components/Nav/PreferenceMenu';
import LANGUAGES_CONST from '../../utils/languages/languageConst';

// retrieve the system languages
const systemLanguages = Object.entries(LANGUAGES_CONST)
	// transform the language constants object to languages array
	.reduce((array, [, language]) => [...array, language], [])
	// filter only the supported languages
	.filter(({ support }) => support);

// configure the states to pass as props to the component
const mapStateToProps = (
	{ darkMode, language, mainResumeLanguages, resumeLanguages },
	...props
) => ({
	darkMode,
	language,
	mainResumeLanguages,
	resumeLanguages,
	...props
});

// configure the prop types validation
PreferenceMenuContainer.propTypes = {
	darkMode: PropTypes.bool.isRequired
};

function PreferenceMenuContainer({ darkMode, ...props }) {
	// setup the cookies hook
	const [, setCookies] = useCookies(['darkMode', 'languageCode']);

	// setup the dark mode toggler
	const darkModeToggle = useCallback(() => {
		setCookies('darkMode', darkMode ? 'false' : 'true', {
			path: '/',
			sameSite: true
		});
	}, [darkMode, setCookies]);

	// setup the element anchor hook
	const [anchorElement, setAnchorElement] = useState(null);

	// handle open language menu
	const onOpen = useCallback(event => {
		// prevent the event propagation
		event.stopPropagation();

		// update the menu anchor element
		setAnchorElement(event.currentTarget);
	}, []);

	// handle close language menu
	const onClose = useCallback(() => {
		setAnchorElement(null);
	}, []);

	// handle close language menu
	const setLanguage = useCallback(
		languageCode => () => {
			// update the language code cookie
			setCookies('languageCode', languageCode, {
				path: '/',
				sameSite: true
			});

			// close the menu
			onClose();
		},
		[onClose, setCookies]
	);

	return (
		<PreferenceMenu
			darkMode={darkMode}
			darkModeToggle={darkModeToggle}
			anchorElement={anchorElement}
			onOpen={onOpen}
			onClose={onClose}
			setLanguage={setLanguage}
			systemLanguages={systemLanguages}
			{...props}
		/>
	);
}

export default connect(mapStateToProps)(PreferenceMenuContainer);
