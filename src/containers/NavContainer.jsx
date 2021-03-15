import React, { useState, useCallback, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';

import { useCookies } from 'react-cookie';

import { useLocation, useHistory } from 'react-router-dom';

import { useInView } from 'react-intersection-observer';

import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';

import { updateNavIntersection, logout } from '../actions';
import { HOME, CV } from '../routes';

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

// configure the states to pass as props to the component
const mapStateToProps = ({ darkMode, username }, ...props) => ({
	darkMode,
	username,
	...props
});

// configure the actions to pass as props to the component
const mapDispatchToProps = {
	updateNavIntersection,
	logout
};

// configure the prop types validation
NavContainer.propTypes = {
	updateNavIntersection: PropTypes.func.isRequired,
	darkMode: PropTypes.bool.isRequired
};

function NavContainer({ updateNavIntersection, logout, darkMode, ...props }) {
	// setup the history hook
	const history = useHistory();

	// setup the cookies hook
	const [, setCookies] = useCookies(['darkMode']);

	// setup the nav type hook
	const [showBar, setShowBar] = useState(false);

	// retrieve the current pathname
	const { pathname } = useLocation();

	// setup the breakpoints matchers hooks
	const { breakpoints } = useTheme();
	const isMdSm = useMediaQuery(breakpoints.up('md'));

	// setup the nav intersection observer
	const inViewObject = useInView({
		rootMargin: '0% 0% -100% 0%'
	});

	// setup the dark mode toggler
	const darkModeToggle = useCallback(() => {
		setCookies('darkMode', darkMode ? 'false' : 'true', {
			path: '/',
			sameSite: true
		});
	}, [darkMode, setCookies]);

	// setup the logout function
	const logoutCallback = useCallback(() => {
		// logout the user
		logout();

		// redirect the user to the home page
		history.push(HOME);
	}, [history, logout]);

	// setup the home test
	const isHome = pathname === HOME;

	// setup the cv test
	const isCV = pathname.includes(CV.split(':')[0]);

	// setup the nav intersection observer updater hook
	useEffect(() => {
		// update the nav intersection observer at the loading of the component
		updateNavIntersection(inViewObject);
	}, [inViewObject, updateNavIntersection]);

	// setup the nav type updater
	useEffect(() => {
		setShowBar(isMdSm && (!(isHome || isCV) || inViewObject.inView));
	}, [inViewObject, isCV, isHome, isMdSm]);

	return (
		<Nav
			links={links(isCV, pathname)}
			darkMode={darkMode}
			darkModeToggle={darkModeToggle}
			showBar={showBar}
			isHome={isHome}
			logout={logoutCallback}
			{...props}
		/>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer);
