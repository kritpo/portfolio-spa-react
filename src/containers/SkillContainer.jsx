import React, { Fragment } from 'react';

import { connect } from 'react-redux';

import Skill from '../components/Skill';
import Languages from '../components/Languages';

// configure the states to pass as props to the component
const mapStateToProps = (state, props) => ({
	resume: state.resume.resume,
	...props
});

function SkillContainer({ ...props }) {
	return (
		<Fragment>
			<Skill {...props} />
			<Languages {...props} />
		</Fragment>
	);
}

export default connect(mapStateToProps)(SkillContainer);
