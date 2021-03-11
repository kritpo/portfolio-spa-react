import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';

import { fetchResume } from '../actions';

import Portfolio from '../components/Portfolio';

// configure the states to pass as props to the component
const mapStateToProps = (
	{ mainResume, navIntersection: { ref: navIntersectionRef } },
	...props
) => ({
	resume: mainResume,
	navIntersectionRef,
	...props
});

// configure the actions to pass as props to the component
const mapDispatchToProps = {
	fetchResume
};

// configure the prop types validation
HomeContainer.propTypes = {
	fetchResume: PropTypes.func.isRequired
};

function HomeContainer({ fetchResume, ...props }) {
	// setup the main resume fetching hook
	useEffect(() => {
		// fetch the main resume at the loading of the component
		fetchResume();
	}, [fetchResume]);

	return <Portfolio {...props} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
