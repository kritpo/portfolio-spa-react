import { PropTypes } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { CV_LIST } from '../../routes';
import CustomLink from '../../utils/CustomLink';
import { DATE, DATE_MASKABLE } from '../../utils/forms/Field/DateField';
import { NUMBER_2, TEXT } from '../../utils/forms/Field/TextField';
import Form from '../../utils/forms/Form';
import checkField, {
	checkDate,
	checkMinLength,
	checkUpdated
} from '../../utils/forms/checkField';
import languages from '../../utils/languages';

// setup field name constants
export const EDUCATION = 'education';
export const GPA = 'gpa';
export const INSTITUTION = 'institution';
export const AREA = 'area';
export const STUDY_TYPE = 'study_type';
export const START_DATE = 'start_date';
export const END_DATE = 'end_date';
export const COURSES = 'courses';
export const CATEGORY = 'category';
export const COURSES_COURSES = 'courses_courses';
export const COURSE = 'course';

// configure the states to pass as props to the component
const mapStateToProps = ({ language }, ...props) => ({
	language,
	...props
});

// configure the prop types validation
EducationContainer.propTypes = {
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function EducationContainer({ language: { systemLanguageCode }, ...props }) {
	// setup the form template
	const template = {
		[EDUCATION]: {
			subform: {
				[INSTITUTION]: {
					type: TEXT,
					label:
						languages[systemLanguageCode].cv.education.institution
							.label,
					defaultValue: '',
					checkField: checkField([
						checkUpdated(
							'',
							languages[systemLanguageCode].checkFieldErrorMessage
								.updated
						),
						checkMinLength(
							3,
							languages[systemLanguageCode].checkFieldErrorMessage
								.minLength
						)
					]),
					inputParam: {
						placeholder:
							languages[systemLanguageCode].cv.education
								.institution.placeholder
					}
				},
				[GPA]: {
					type: NUMBER_2,
					label: languages[systemLanguageCode].cv.education.gpa.label,
					defaultValue: '',
					checkField: checkField([
						checkUpdated(
							'',
							languages[systemLanguageCode].checkFieldErrorMessage
								.updated
						)
					]),
					inputParam: {
						placeholder:
							languages[systemLanguageCode].cv.education.gpa
								.placeholder
					}
				},
				[AREA]: {
					type: TEXT,
					label:
						languages[systemLanguageCode].cv.education.area.label,
					defaultValue: '',
					checkField: checkField([
						checkUpdated(
							'',
							languages[systemLanguageCode].checkFieldErrorMessage
								.updated
						),
						checkMinLength(
							3,
							languages[systemLanguageCode].checkFieldErrorMessage
								.minLength
						)
					]),
					inputParam: {
						placeholder:
							languages[systemLanguageCode].cv.education.area
								.placeholder
					}
				},
				[STUDY_TYPE]: {
					type: TEXT,
					label:
						languages[systemLanguageCode].cv.education.studyType
							.label,
					defaultValue: '',
					checkField: checkField([
						checkUpdated(
							'',
							languages[systemLanguageCode].checkFieldErrorMessage
								.updated
						),
						checkMinLength(
							3,
							languages[systemLanguageCode].checkFieldErrorMessage
								.minLength
						)
					]),
					inputParam: {
						placeholder:
							languages[systemLanguageCode].cv.education.studyType
								.placeholder
					}
				},
				[START_DATE]: {
					type: DATE,
					label:
						languages[systemLanguageCode].cv.education.startDate
							.label,
					defaultValue: new Date(),
					checkField: checkField([
						checkDate(
							languages[systemLanguageCode].checkFieldErrorMessage
								.date
						)
					]),
					configParam: {
						maxDate: new Date(),
						maxDateField: END_DATE,
						maxDateMessage:
							languages[systemLanguageCode].cv.maxDateMessage,
						dateFormat: languages[systemLanguageCode].cv.dateFormat,
						invalidDateMessage:
							languages[systemLanguageCode].cv.invalidDateMessage
					}
				},
				[END_DATE]: {
					type: DATE_MASKABLE,
					label:
						languages[systemLanguageCode].cv.education.endDate
							.label,
					defaultValue: new Date(),
					checkField: checkField([
						checkDate(
							languages[systemLanguageCode].checkFieldErrorMessage
								.date
						)
					]),
					configParam: {
						minDateField: START_DATE,
						minDateMessage:
							languages[systemLanguageCode].cv.minDateMessage,
						dateFormat: languages[systemLanguageCode].cv.dateFormat,
						invalidDateMessage:
							languages[systemLanguageCode].cv.invalidDateMessage,
						currentLabel:
							languages[systemLanguageCode].cv.currentLabel
					}
				},
				[COURSES]: {
					subform: {
						[CATEGORY]: {
							type: TEXT,
							label:
								languages[systemLanguageCode].cv.education
									.category.label,
							defaultValue: '',
							checkField: checkField([
								checkUpdated(
									'',
									languages[systemLanguageCode]
										.checkFieldErrorMessage.updated
								),
								checkMinLength(
									2,
									languages[systemLanguageCode]
										.checkFieldErrorMessage.minLength
								)
							]),
							inputParam: {
								placeholder:
									languages[systemLanguageCode].cv.education
										.category.placeholder
							}
						},
						[COURSES_COURSES]: {
							subform: {
								[COURSE]: {
									type: TEXT,
									label:
										languages[systemLanguageCode].cv
											.education.course.label,
									defaultValue: '',
									checkField: checkField([
										checkUpdated(
											'',
											languages[systemLanguageCode]
												.checkFieldErrorMessage.updated
										),
										checkMinLength(
											3,
											languages[systemLanguageCode]
												.checkFieldErrorMessage
												.minLength
										)
									]),
									inputParam: {
										placeholder:
											languages[systemLanguageCode].cv
												.education.course.placeholder
									}
								}
							},
							addLabel:
								languages[systemLanguageCode].cv.education
									.addCoursesCourses,
							removeLabel:
								languages[systemLanguageCode].cv.education
									.removeCoursesCourses
						}
					},
					addLabel:
						languages[systemLanguageCode].cv.education.addCourses,
					removeLabel:
						languages[systemLanguageCode].cv.education.removeCourses
				}
			},
			addLabel: languages[systemLanguageCode].cv.education.addEducation,
			removeLabel:
				languages[systemLanguageCode].cv.education.removeEducation
		}
	};

	return (
		<Form
			template={template}
			errorMessage={languages[systemLanguageCode].cv.error}
			sendingMessage={
				languages[systemLanguageCode].generic.sendingMessage
			}
			{...props}
		>
			<CustomLink to={CV_LIST}>
				{languages[systemLanguageCode].cv.goToCVList}
			</CustomLink>
		</Form>
	);
}

export default connect(mapStateToProps)(EducationContainer);
