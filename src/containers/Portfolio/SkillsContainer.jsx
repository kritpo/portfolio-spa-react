import React from 'react';

import { connect } from 'react-redux';

import Skills from '../../components/Portfolio/Skills';

// configure the states to pass as props to the component
const mapStateToProps = ({ resume: { resume } }, props) => ({
	resume,
	...props
});

function SkillContainer({ ...props }) {
	return <Skills {...props} />;
}

export default connect(mapStateToProps)(SkillContainer);
