import { PropTypes } from 'prop-types';
import React, { useCallback, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { updateResume } from '../../actions';
import * as cvUtils from '../../utils/cvUtils';
import { MAX_DATE } from '../../utils/forms/Field/DateField';
import languages from '../../utils/languages';
import ProjectsContainer, {
	END_DATE,
	NAME,
	PICTURE,
	PROJECTS,
	START_DATE,
	SUMMARY,
	TECHNOLOGIES,
	TECHNOLOGY,
	URL
} from '../CV/ProjectsContainer';

// configure the states to pass as props to the component
const mapStateToProps = ({ language }, ...props) => ({
	language,
	...props
});

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
	setForm: PropTypes.func.isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function UpdateProjectsContainer({
	projects,
	updateResume,
	setForm,
	language: { systemLanguageCode }
}) {
	// setup the mounting status checker hook
	let _isMounted = useRef(true);

	// auto unsubscribe
	useEffect(
		// config the willUnmount cleanup
		() => () => {
			_isMounted.current = false;
		},
		[]
	);

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
					{ name: START_DATE, payload: new Date(startDate) },
					{
						name: END_DATE,
						payload:
							endDate !== undefined ? new Date(endDate) : MAX_DATE
					},
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
				// check if the component is still mounted
				if (_isMounted.current) {
					// call setForm to change the update status to false
					setForm();
				}

				// unlock the form
				unlock();
			}),
		[setForm, updateResume]
	);

	return (
		<ProjectsContainer
			data={data}
			onSubmit={onSubmit}
			action={languages[systemLanguageCode].cvUpdate.action}
			setForm={setForm}
		/>
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UpdateProjectsContainer);
