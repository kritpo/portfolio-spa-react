import React from 'react';
import { connect } from 'react-redux';

import Footer from '../components/Footer';

// configure the states to pass as props to the component
const mapStateToProps = ({ language }, ...props) => ({
	language,
	...props
});

function FooterContainer({ ...props }) {
	return <Footer {...props} />;
}

export default connect(mapStateToProps)(FooterContainer);
