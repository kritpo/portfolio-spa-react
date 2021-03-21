import { PropTypes } from 'prop-types';
import React from 'react';

import {
	Box,
	Button,
	FormControlLabel,
	Menu,
	MenuItem,
	Switch
} from '@material-ui/core';
import {
	Brightness4 as Dark,
	Brightness7 as Light,
	Translate
} from '@material-ui/icons';

/**
 * convert languages to menu items
 * @param {array} languages the list of languages
 * @param {function} setLanguage the language updater
 * @returns the menu items array
 */
const languagesMenu = (languages, setLanguage) =>
	languages.map(({ languageCode, language }, index) => (
		<MenuItem onClick={setLanguage(languageCode)} key={index}>
			{language}
		</MenuItem>
	));

// configure the prop types validation
PreferenceMenu.propTypes = {
	darkMode: PropTypes.bool.isRequired,
	darkModeToggle: PropTypes.func.isRequired,
	anchorElement: PropTypes.object,
	onOpen: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	setLanguage: PropTypes.func.isRequired,
	isHome: PropTypes.bool.isRequired,
	isCV: PropTypes.bool.isRequired,
	mainResumeLanguages: PropTypes.shape({
		mainResumeLanguages: PropTypes.shape({
			languages: PropTypes.arrayOf(
				PropTypes.shape({
					languageCode: PropTypes.string.isRequired,
					language: PropTypes.string.isRequired
				})
			)
		}).isRequired
	}).isRequired,
	resumeLanguages: PropTypes.shape({
		resumeLanguages: PropTypes.shape({
			languages: PropTypes.arrayOf(
				PropTypes.shape({
					languageCode: PropTypes.string.isRequired,
					language: PropTypes.string.isRequired
				})
			)
		}).isRequired
	}).isRequired,
	systemLanguages: PropTypes.arrayOf(
		PropTypes.shape({
			languageCode: PropTypes.string.isRequired,
			language: PropTypes.string.isRequired
		})
	).isRequired,
	language: PropTypes.shape({
		resumeLanguageCode: PropTypes.string.isRequired,
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function PreferenceMenu({
	darkMode,
	darkModeToggle,
	anchorElement,
	onOpen,
	onClose,
	setLanguage,
	isHome,
	isCV,
	mainResumeLanguages: { mainResumeLanguages },
	resumeLanguages: { resumeLanguages },
	systemLanguages,
	language: { resumeLanguageCode, systemLanguageCode }
}) {
	return (
		<Box display="flex">
			<Box>
				<Button
					aria-controls="language-menu"
					aria-haspopup="true"
					onClick={onOpen}
					startIcon={<Translate />}
				>
					{isHome || isCV
						? resumeLanguageCode.toUpperCase()
						: systemLanguageCode.toUpperCase()}
				</Button>
				<Menu
					id="language-menu"
					anchorEl={anchorElement}
					keepMounted
					open={Boolean(anchorElement)}
					onClose={onClose}
				>
					{isHome && mainResumeLanguages.languages !== undefined
						? languagesMenu(
								mainResumeLanguages.languages,
								setLanguage
						  )
						: isCV && resumeLanguages.languages !== undefined
						? languagesMenu(resumeLanguages.languages, setLanguage)
						: languagesMenu(systemLanguages, setLanguage)}
				</Menu>
			</Box>
			<FormControlLabel
				control={
					<Switch checked={darkMode} onChange={darkModeToggle} />
				}
				label={darkMode ? <Dark /> : <Light />}
			/>
		</Box>
	);
}

export default PreferenceMenu;
