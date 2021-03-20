import React from 'react';

import { connect } from 'react-redux';

import Error404 from '../components/Error404';

// configure the states to pass as props to the component
const mapStateToProps = ({ language }, ...props) => ({
	language,
	...props
});

function Error404Container({ ...props }) {
	return <Error404 {...props} />;
}

export default connect(mapStateToProps)(Error404Container);
