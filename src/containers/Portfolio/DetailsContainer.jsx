import React from 'react';

import { connect } from 'react-redux';

import Details from '../../components/Portfolio/Details';

// configure the states to pass as props to the component
const mapStateToProps = ({ resume: { resume } }, props) => ({
	resume,
	...props
});

function DetailsContainer({ ...props }) {
	return <Details {...props} />;
}

export default connect(mapStateToProps)(DetailsContainer);
