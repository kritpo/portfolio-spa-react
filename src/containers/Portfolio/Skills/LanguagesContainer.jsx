import React from 'react';
import { connect } from 'react-redux';

import Languages from '../../../components/Portfolio/Skills/Languages';

// configure the states to pass as props to the component
const mapStateToProps = ({ language }, ...props) => ({
	language,
	...props
});

function LanguagesContainer({ ...props }) {
	return <Languages {...props} />;
}

export default connect(mapStateToProps)(LanguagesContainer);
