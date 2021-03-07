import React from 'react';
import { PropTypes } from 'prop-types';

import { Box, FormControlLabel, Switch } from '@material-ui/core';
import { Brightness4 as Dark, Brightness7 as Light } from '@material-ui/icons';

import NavBarContainer from '../containers/Nav/NavBarContainer';
import NavBurger from './Nav/NavBurger';

/**
 * setup the dark mode menu
 * @param {bool} darkMode the status of dark mode
 * @param {function} darkModeToggle the dark mode toggler
 * @returns the component
 */
const darkModeMenu = (darkMode, darkModeToggle) => (
	<Box display="flex" justifyContent="center">
		<FormControlLabel
			control={<Switch checked={darkMode} onChange={darkModeToggle} />}
			label={darkMode ? <Dark /> : <Light />}
		/>
	</Box>
);

// configure the prop types validation
Nav.propTypes = {
	links: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			link: PropTypes.string.isRequired,
			isHash: PropTypes.bool.isRequired
		})
	).isRequired,
	darkMode: PropTypes.bool,
	darkModeToggle: PropTypes.func.isRequired,
	showBar: PropTypes.bool.isRequired
};

function Nav({ links, darkMode, darkModeToggle, showBar }) {
	return (
		<Box component="nav">
			{showBar ? (
				<NavBarContainer
					darkModeMenu={darkModeMenu(darkMode, darkModeToggle)}
				>
					{links}
				</NavBarContainer>
			) : (
				<NavBurger
					darkModeMenu={darkModeMenu(darkMode, darkModeToggle)}
				>
					{links}
				</NavBurger>
			)}
		</Box>
	);
}

export default Nav;
