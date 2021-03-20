import React from 'react';
import { connect } from 'react-redux';

import Terms from '../components/Terms';

// configure the states to pass as props to the component
const mapStateToProps = ({ language }, ...props) => ({
	language,
	...props
});

function TermsContainer({ ...props }) {
	return <Terms {...props} />;
}

export default connect(mapStateToProps)(TermsContainer);
