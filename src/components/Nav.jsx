import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { useLocation } from 'react-router-dom';

import { useTheme } from '@material-ui/styles';

import { Box, MenuList, useMediaQuery } from '@material-ui/core';

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
	inView: PropTypes.bool.isRequired
};

function Nav({ inView }) {
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

	return (
		<Box component="nav">
			{showBar ? (
				<NavBar>{links}</NavBar>
			) : (
				<BurgerMenu top="1em" right="1em">
					<MenuList>{linkItems}</MenuList>
				</BurgerMenu>
			)}
		</Box>
	);
}

export default Nav;
