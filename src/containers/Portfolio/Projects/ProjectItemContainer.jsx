import React from 'react';
import { PropTypes } from 'prop-types';

import ProjectItem from '../../../components/Portfolio/Projects/ProjectItem';

// configure the prop types validation
ProjectItemContainer.propTypes = {
	project: PropTypes.shape({
		startDate: PropTypes.string.isRequired,
		endDate: PropTypes.string
	}).isRequired
};

function ProjectItemContainer({ project, ...props }) {
	// compute the dates associated to the project item
	const startDate = new Date(project.startDate).toLocaleDateString();
	const endDate =
		project.endDate !== undefined
			? new Date(project.endDate).toLocaleDateString()
			: 'Présent';

	return (
		<ProjectItem
			project={project}
			startDate={startDate}
			endDate={endDate}
			{...props}
		/>
	);
}

export default ProjectItemContainer;