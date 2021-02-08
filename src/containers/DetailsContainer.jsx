import React from 'react';

import { connect } from 'react-redux';

import Details from '../components/Details';

// configure the states to pass as props to the component
const mapStateToProps = (state, props) => ({
	resume: state.resume,
	...props
});

function DetailsContainer({ ...props }) {
	return <Details {...props} />;
}

export default connect(mapStateToProps)(DetailsContainer);
