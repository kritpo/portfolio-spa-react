import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';

import Skill from '../../../components/Portfolio/Skills/Skill';

// configure the states to pass as props to the component
const mapStateToProps = ({ language }, ...props) => ({
	language,
	...props
});

function SkillContainer({ ...props }) {
	// setup the collapse status hook
	const [openCollapse, setOpenCollapse] = useState(false);

	// setup the toggle handler
	const collapseToggle = useCallback(() => {
		setOpenCollapse(!openCollapse);
	}, [openCollapse]);

	return (
		<Skill
			openCollapse={openCollapse}
			collapseToggle={collapseToggle}
			{...props}
		/>
	);
}

export default connect(mapStateToProps)(SkillContainer);
