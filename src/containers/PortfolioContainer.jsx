import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';

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
	// setup the resume fetching hook
	useEffect(() => {
		// fetch the resume at the loading of the component
		fetchResume();
	}, [fetchResume]);

	return <Portfolio {...props} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioContainer);
