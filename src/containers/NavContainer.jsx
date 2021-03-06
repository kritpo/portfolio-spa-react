import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';

import { updateNavIntersection } from '../actions';
import Nav from '../components/Nav';
import { CV_CREATE, CV_LIST, CV_UPDATE, HOME, PORTFOLIO } from '../routes';
import languages from '../utils/languages';

/**
 * setup the list of links
 * @param {boolean} isCV if the path is a CV path
 * @param {string} pathname the current pathname
 * @param {string} username the current username
 * @param {string} _language the system language code
 * @returns the list of links
 */
const links = (isCV, pathname, username, { systemLanguageCode }) => {
	// retrieve the final url
	const url = !isCV
		? (pathname === CV_LIST ||
				pathname === CV_CREATE ||
				pathname === CV_UPDATE) &&
		  username !== ''
			? PORTFOLIO.replace(':username', username)
			: HOME
		: pathname;

	return [
		{
			title: languages[systemLanguageCode].portfolio.details.label,
			link: `${url}#details`,
			isHash: true
		},
		{
			title: languages[systemLanguageCode].portfolio.career.label,
			link: `${url}#career`,
			isHash: true
		},
		{
			title: languages[systemLanguageCode].portfolio.projects.label,
			link: `${url}#projects`,
			isHash: true
		},
		{
			title: languages[systemLanguageCode].portfolio.skills.label,
			link: `${url}#skills`,
			isHash: true
		},
		{
			title: languages[systemLanguageCode].portfolio.references.label,
			link: `${url}#references`,
			isHash: true
		}
	];
};

// configure the states to pass as props to the component
const mapStateToProps = ({ username, language }, ...props) => ({
	username,
	language,
	...props
});

// configure the actions to pass as props to the component
const mapDispatchToProps = {
	updateNavIntersection
};

// configure the prop types validation
NavContainer.propTypes = {
	updateNavIntersection: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function NavContainer({ updateNavIntersection, username, language, ...props }) {
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
			links={links(isCV, pathname, username, language)}
			showBar={showBar}
			isHome={isHome}
			isCV={isCV}
			showTextBreakpoint={showTextBreakpoint}
			{...props}
		/>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer);
