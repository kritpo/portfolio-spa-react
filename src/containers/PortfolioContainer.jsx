import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';

import { useRouteMatch } from 'react-router-dom';

import { fetchResume } from '../actions';

import Portfolio from '../components/Portfolio';

// configure the states to pass as props to the component
const mapStateToProps = (
	{ resume, navIntersection: { ref: navIntersectionRef } },
	...props
) => ({
	resume,
	navIntersectionRef,
	...props
});

// configure the actions to pass as props to the component
const mapDispatchToProps = {
	fetchResume
};

// configure the prop types validation
PortfolioContainer.propTypes = {
	fetchResume: PropTypes.func.isRequired
};

function PortfolioContainer({ fetchResume, ...props }) {
	// retrieve the username from the match hook
	const {
		params: { username }
	} = useRouteMatch();

	// setup the resume fetching hook
	useEffect(() => {
		// fetch the resume at the loading of the component
		fetchResume(false, username);
	}, [fetchResume, username]);

	return <Portfolio isMain={false} {...props} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioContainer);
