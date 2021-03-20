import React from 'react';

import { connect } from 'react-redux';

import Error401 from '../components/Error401';

// configure the states to pass as props to the component
const mapStateToProps = ({ language }, ...props) => ({
	language,
	...props
});

function Error401Container({ ...props }) {
	return <Error401 {...props} />;
}

export default connect(mapStateToProps)(Error401Container);
