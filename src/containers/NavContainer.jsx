import React, { useState, useCallback, useEffect } from 'react';

import { connect } from 'react-redux';

import { useLocation } from 'react-router-dom';

import { useInView } from 'react-intersection-observer';

import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';

import {
	updateNavIntersection,
	setToLightMode,
	setToDarkMode
} from '../actions';
import { HOME } from '../routes';

import Nav from '../components/Nav';

// setup the list of links
const links = [
	{
		title: 'Présentation',
		link: `${HOME}#details`,
		isHash: true
	},
	{
		title: 'Parcours',
		link: `${HOME}#career`,
		isHash: true
	},
	{
		title: 'Compétences',
		link: `${HOME}#skills`,
		isHash: true
	},
	{
		title: 'Recommandations',
		link: `${HOME}#references`,
		isHash: true
	}
];

// configure the states to pass as props to the component
const mapStateToProps = (
	{ navIntersection: { inView }, darkMode },
	...props
) => ({
	inView,
	darkMode,
	...props
});

// configure the actions to pass as props to the component
const mapDispatchToProps = {
	updateNavIntersection,
	setToLightMode,
	setToDarkMode
};

function NavContainer({
	updateNavIntersection,
	setToLightMode,
	setToDarkMode,
	darkMode,
	...props
}) {
	// setup the nav type hook
	const [showBar, setShowBar] = useState(false);

	// retrieve the current pathname
	const { pathname } = useLocation();

	// setup the breakpoints matchers hooks
	const { breakpoints } = useTheme();
	const isUpSm = useMediaQuery(breakpoints.up('sm'));

	// setup the nav intersection observer
	const inViewObject = useInView({
		rootMargin: '0% 0% -100% 0%'
	});

	// setup the dark mode toggler
	const darkModeToggle = useCallback(() => {
		// check if the dark mode is active
		if (darkMode) {
			setToLightMode();
		} else {
			setToDarkMode();
		}
	}, [darkMode, setToDarkMode, setToLightMode]);

	// setup the nav intersection observer updater hook
	useEffect(() => {
		// update the nav intersection observer at the loading of the component
		updateNavIntersection(inViewObject);
	}, [inViewObject, updateNavIntersection]);

	// setup the nav type updater
	useEffect(() => {
		setShowBar(isUpSm && (pathname !== HOME || inViewObject.inView));
	}, [inViewObject, isUpSm, pathname]);

	return (
		<Nav
			links={links}
			darkMode={darkMode}
			darkModeToggle={darkModeToggle}
			showBar={showBar}
			{...props}
		/>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer);
