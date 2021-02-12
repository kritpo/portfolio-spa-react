import React, { useEffect } from 'react';

import { connect } from 'react-redux';

import { useInView } from 'react-intersection-observer';

import {
	updateNavIntersection,
	setToLightMode,
	setToDarkMode
} from '../actions';

import Nav from '../components/Nav';

// configure the states to pass as props to the component
const mapStateToProps = (state, ...props) => ({
	inView: state.navIntersection.inView,
	darkMode: state.darkMode,
	...props
});

// configure the actions to pass as props to the component
const mapDispatchToProps = {
	updateNavIntersection,
	setToLightMode,
	setToDarkMode
};

function NavContainer({ updateNavIntersection, ...props }) {
	// setup the nav intersection observer
	const inView = useInView({
		rootMargin: '0% 0% -100% 0%'
	});

	// setup the nav intersection observer updater hook
	useEffect(() => {
		// update the nav intersection observer at the loading of the component
		updateNavIntersection(inView);
	}, [updateNavIntersection, inView]);

	return <Nav {...props} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer);
