import React, { useCallback } from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';

import { updateResume } from '../../actions';
import * as cvUtils from '../../utils/cvUtils';

import ProjectsContainer, {
	PROJECTS,
	NAME,
	SUMMARY,
	PICTURE,
	URL,
	START_DATE,
	END_DATE,
	TECHNOLOGIES,
	TECHNOLOGY
} from '../CV/ProjectsContainer';

// configure the actions to pass as props to the component
const mapDispatchToProps = {
	updateResume
};

// configure the prop types validation
UpdateProjectsContainer.propTypes = {
	projects: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			summary: PropTypes.string.isRequired,
			startDate: PropTypes.string.isRequired,
			endDate: PropTypes.string,
			picture: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
			technologies: PropTypes.arrayOf(PropTypes.string).isRequired
		})
	).isRequired,
	updateResume: PropTypes.func.isRequired,
	setForm: PropTypes.func.isRequired
};

function UpdateProjectsContainer({ projects, updateResume, setForm }) {
	// setup the fields data
	const data = [
		{
			name: PROJECTS,
			payload: projects.map(
				({
					name,
					summary,
					startDate,
					endDate,
					picture,
					url,
					technologies
				}) => [
					{ name: NAME, payload: name },
					{ name: SUMMARY, payload: summary },
					{ name: START_DATE, payload: startDate },
					{ name: END_DATE, payload: endDate },
					{ name: PICTURE, payload: picture },
					{ name: URL, payload: url },
					{
						name: TECHNOLOGIES,
						payload: technologies.map(technology => [
							{ name: TECHNOLOGY, payload: technology }
						])
					}
				]
			)
		}
	];

	// setup the onSubmit callback
	const onSubmit = useCallback(
		(form, reCaptchaToken, unlock) =>
			updateResume({
				projects: cvUtils.mapProjectsFormToObject(form)
			}).then(() => {
				// unlock the form
				unlock();
			}),
		[updateResume]
	);

	return (
		<ProjectsContainer
			data={data}
			onSubmit={onSubmit}
			action="Modifier"
			setForm={setForm}
		/>
	);
}

export default connect(null, mapDispatchToProps)(UpdateProjectsContainer);
