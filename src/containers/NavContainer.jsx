import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';

import { useLocation } from 'react-router-dom';

import { useInView } from 'react-intersection-observer';

import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';

import { updateNavIntersection } from '../actions';
import { HOME, PORTFOLIO } from '../routes';

import Nav from '../components/Nav';

/**
 * setup the list of links
 * @param {boolean} isCV if the path is a CV path
 * @param {string} pathname the current pathname
 * @returns the list of links
 */
const links = (isCV, pathname) => [
	{
		title: 'Présentation',
		link: `${isCV ? pathname : HOME}#details`,
		isHash: true
	},
	{
		title: 'Parcours',
		link: `${isCV ? pathname : HOME}#career`,
		isHash: true
	},
	{
		title: 'Projets',
		link: `${isCV ? pathname : HOME}#projects`,
		isHash: true
	},
	{
		title: 'Compétences',
		link: `${isCV ? pathname : HOME}#skills`,
		isHash: true
	},
	{
		title: 'Recommandations',
		link: `${isCV ? pathname : HOME}#references`,
		isHash: true
	}
];

// configure the actions to pass as props to the component
const mapDispatchToProps = {
	updateNavIntersection
};

// configure the prop types validation
NavContainer.propTypes = {
	updateNavIntersection: PropTypes.func.isRequired
};

function NavContainer({ updateNavIntersection, ...props }) {
	// setup the nav type hook
	const [showBar, setShowBar] = useState(false);

	// retrieve the current pathname
	const { pathname } = useLocation();

	// setup the breakpoints matchers hooks
	const { breakpoints } = useTheme();
	const showBarBreakpoint = useMediaQuery(breakpoints.up('md'));
	const showTextBreakpoint = useMediaQuery(breakpoints.up('lg'));

	// setup the nav intersection observer
	const inViewObject = useInView({
		rootMargin: '0% 0% -100% 0%'
	});

	// setup the home test
	const isHome = pathname === HOME;

	// setup the cv test
	const isCV = pathname.includes(PORTFOLIO.split(':')[0]);

	// setup the nav intersection observer updater hook
	useEffect(() => {
		// update the nav intersection observer at the loading of the component
		updateNavIntersection(inViewObject);
	}, [inViewObject, updateNavIntersection]);

	// setup the nav type updater
	useEffect(() => {
		setShowBar(
			showBarBreakpoint && (!(isHome || isCV) || inViewObject.inView)
		);
	}, [inViewObject, isCV, isHome, showBarBreakpoint]);

	return (
		<Nav
			links={links(isCV, pathname)}
			showBar={showBar}
			isHome={isHome}
			showTextBreakpoint={showTextBreakpoint}
			{...props}
		/>
	);
}

export default connect(null, mapDispatchToProps)(NavContainer);
