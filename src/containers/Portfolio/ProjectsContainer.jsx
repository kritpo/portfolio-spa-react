import React from 'react';
import { connect } from 'react-redux';

import Projects from '../../components/Portfolio/Projects';

// configure the states to pass as props to the component
const mapStateToProps = ({ language }, ...props) => ({
	language,
	...props
});

function ProjectsContainer({ ...props }) {
	return <Projects {...props} />;
}

export default connect(mapStateToProps)(ProjectsContainer);
