import React from 'react';

import { connect } from 'react-redux';

import HomeMenu from '../../components/Nav/HomeMenu';

// configure the states to pass as props to the component
const mapStateToProps = ({ language }, ...props) => ({
	language,
	...props
});

function HomeMenuContainer({ ...props }) {
	return <HomeMenu {...props} />;
}

export default connect(mapStateToProps)(HomeMenuContainer);
