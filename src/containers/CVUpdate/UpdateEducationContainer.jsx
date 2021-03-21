import { PropTypes } from 'prop-types';
import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import { updateResume } from '../../actions';
import * as cvUtils from '../../utils/cvUtils';
import languages from '../../utils/languages';
import EducationContainer, {
	AREA,
	CATEGORY,
	COURSE,
	COURSES,
	COURSES_COURSES,
	EDUCATION,
	END_DATE,
	GPA,
	INSTITUTION,
	START_DATE,
	STUDY_TYPE
} from '../CV/EducationContainer';

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
UpdateEducationContainer.propTypes = {
	education: PropTypes.arrayOf(
		PropTypes.shape({
			institution: PropTypes.string.isRequired,
			area: PropTypes.string.isRequired,
			studyType: PropTypes.string.isRequired,
			startDate: PropTypes.string.isRequired,
			endDate: PropTypes.string,
			gpa: PropTypes.string.isRequired,
			courses: PropTypes.arrayOf(
				PropTypes.shape({
					category: PropTypes.string.isRequired,
					courses: PropTypes.arrayOf(PropTypes.string).isRequired
				})
			).isRequired
		})
	).isRequired,
	updateResume: PropTypes.func.isRequired,
	setForm: PropTypes.func.isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function UpdateEducationContainer({
	education,
	updateResume,
	setForm,
	language: { systemLanguageCode }
}) {
	// setup the fields data
	const data = [
		{
			name: EDUCATION,
			payload: education.map(
				({
					institution,
					area,
					studyType,
					startDate,
					endDate,
					gpa,
					courses
				}) => [
					{ name: INSTITUTION, payload: institution },
					{ name: AREA, payload: area },
					{ name: STUDY_TYPE, payload: studyType },
					{ name: START_DATE, payload: new Date(startDate) },
					{ name: END_DATE, payload: new Date(endDate) },
					{ name: GPA, payload: gpa },
					{
						name: COURSES,
						payload: courses.map(({ category, courses }) => [
							{ name: CATEGORY, payload: category },
							{
								name: COURSES_COURSES,
								payload: courses.map(course => [
									{ name: COURSE, payload: course }
								])
							}
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
				education: cvUtils.mapEducationFormToObject(form)
			}).then(() => {
				// call setForm to change the update status to false
				setForm();

				// unlock the form
				unlock();
			}),
		[setForm, updateResume]
	);

	return (
		<EducationContainer
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
)(UpdateEducationContainer);
