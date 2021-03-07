import React, { useState, useCallback } from 'react';

import Skill from '../../../components/Portfolio/Skills/Skill';

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

export default SkillContainer;
