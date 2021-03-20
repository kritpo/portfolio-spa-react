import React from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';

import languages from '../../../utils/languages';

import ProjectItem from '../../../components/Portfolio/Projects/ProjectItem';

// configure the states to pass as props to the component
const mapStateToProps = ({ language }, ...props) => ({
	language,
	...props
});

// configure the prop types validation
ProjectItemContainer.propTypes = {
	project: PropTypes.shape({
		startDate: PropTypes.string.isRequired,
		endDate: PropTypes.string
	}).isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function ProjectItemContainer({
	project,
	language: { systemLanguageCode },
	...props
}) {
	// compute the dates associated to the project item
	const startDate = new Date(project.startDate).toLocaleDateString();
	const endDate =
		project.endDate !== undefined
			? new Date(project.endDate).toLocaleDateString()
			: languages[systemLanguageCode].portfolio.projects.current;

	return (
		<ProjectItem
			project={project}
			startDate={startDate}
			endDate={endDate}
			{...props}
		/>
	);
}

export default connect(mapStateToProps)(ProjectItemContainer);
