import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { useLocation } from 'react-router-dom';

import { useTheme } from '@material-ui/styles';

import {
	Box,
	MenuList,
	FormControlLabel,
	Switch,
	useMediaQuery
} from '@material-ui/core';
import { Brightness4 as Dark, Brightness7 as Light } from '@material-ui/icons';

import BurgerMenu from '../tools/BurgerMenu';
import NavBar from './Nav/NavBar';
import NavHashItem from './Nav/NavHashItem';

// setup the list of links
const links = [
	{
		title: 'Présentation',
		link: '/#details',
		isHash: true
	},
	{
		title: 'Parcours',
		link: '/#career',
		isHash: true
	},
	{
		title: 'Compétences',
		link: '/#skills',
		isHash: true
	},
	{
		title: 'Recommandations',
		link: '/#references',
		isHash: true
	}
];

// convert links details to React component
const linkItems = links.map(({ title, link, isHash = false }, index) =>
	isHash ? (
		<NavHashItem to={link} key={index}>
			{title}
		</NavHashItem>
	) : null
);

// configure the prop types validation
Nav.propTypes = {
	inView: PropTypes.bool.isRequired,
	darkMode: PropTypes.bool,
	setToLightMode: PropTypes.func.isRequired,
	setToDarkMode: PropTypes.func.isRequired
};

function Nav({ inView, darkMode, setToLightMode, setToDarkMode }) {
	// setup the nav type hook
	const [showBar, setShowBar] = useState(false);

	// setup the breakpoints matchers hooks
	const theme = useTheme();
	const isUpSm = useMediaQuery(theme.breakpoints.up('sm'));

	// retrieve the current route
	const route = useLocation().pathname;

	// setup the nav type updater
	useEffect(() => {
		setShowBar(isUpSm && (route !== '/' || inView));
	}, [inView, isUpSm, route]);

	// setup the dark mode toggler
	const darkModeToggle = () => {
		// check if the dark mode is active
		if (darkMode) {
			setToLightMode();
		} else {
			setToDarkMode();
		}
	};

	// setup the dark mode menu
	const darkModeMenu = (
		<Box display="flex" justifyContent="center">
			<FormControlLabel
				control={
					<Switch checked={darkMode} onChange={darkModeToggle} />
				}
				label={darkMode ? <Dark /> : <Light />}
			/>
		</Box>
	);

	return (
		<Box component="nav">
			{showBar ? (
				<NavBar
					darkModeMenu={
						<Box display="flex" justifyContent="center">
							<FormControlLabel
								control={
									<Switch
										checked={darkMode}
										onChange={darkModeToggle}
									/>
								}
								label={darkMode ? <Dark /> : <Light />}
							/>
						</Box>
					}
				>
					{links}
				</NavBar>
			) : (
				<BurgerMenu top="1em" right="1em">
					<MenuList>
						{linkItems}
						{darkModeMenu}
					</MenuList>
				</BurgerMenu>
			)}
		</Box>
	);
}

export default Nav;
