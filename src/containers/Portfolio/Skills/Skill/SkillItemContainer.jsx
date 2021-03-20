import React from 'react';

import { connect } from 'react-redux';

import SkillItem from '../../../../components/Portfolio/Skills/Skill/SkillItem';

// configure the states to pass as props to the component
const mapStateToProps = ({ language }, ...props) => ({
	language,
	...props
});

function SkillItemContainer({ ...props }) {
	return <SkillItem {...props} />;
}

export default connect(mapStateToProps)(SkillItemContainer);
