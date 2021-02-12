import React from 'react';

import { connect } from 'react-redux';

import References from '../../components/Portfolio/References';

// configure the states to pass as props to the component
const mapStateToProps = (state, props) => ({
	resume: state.resume.resume,
	...props
});

function ReferencesContainer({ ...props }) {
	return <References {...props} />;
}

export default connect(mapStateToProps)(ReferencesContainer);
