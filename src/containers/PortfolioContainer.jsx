import React, { useEffect } from 'react';

import { connect } from 'react-redux';

import { fetchResume } from '../actions';

import Portfolio from '../components/Portfolio';

// configure the states to pass as props to the component
const mapStateToProps = (state, ...props) => ({
	...props
});

// configure the actions to pass as props to the component
const mapDispatchToProps = {
	fetchResume
};

export const PortfolioContainer = ({ fetchResume, ...props }) => {
	// setup the resume fetching hook
	useEffect(() => {
		// fetch the resume at the loading of the component
		fetchResume();
	}, [fetchResume]);

	return <Portfolio {...props} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioContainer);
