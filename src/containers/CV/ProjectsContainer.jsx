import { PropTypes } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { DATE, DATE_MASKABLE } from '../../utils/forms/Field/DateField';
import { TECHNOLOGY as TECHNOLOGY_TYPE } from '../../utils/forms/Field/IconSetField';
import {
	TEXT,
	TEXTAREA,
	URL as URL_TYPE
} from '../../utils/forms/Field/TextField';
import Form from '../../utils/forms/Form';
import checkField, {
	checkDate,
	checkMinLength
} from '../../utils/forms/checkField';
import languages from '../../utils/languages';

// setup field name constants
export const PROJECTS = 'projects';
export const NAME = 'name';
export const SUMMARY = 'summary';
export const PICTURE = 'picture';
export const URL = 'url';
export const START_DATE = 'start_date';
export const END_DATE = 'end_date';
export const TECHNOLOGIES = 'technologies';
export const TECHNOLOGY = 'technology';

// configure the states to pass as props to the component
const mapStateToProps = ({ language }, ...props) => ({
	language,
	...props
});

// configure the prop types validation
ProjectsContainer.propTypes = {
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function ProjectsContainer({ language: { systemLanguageCode }, ...props }) {
	// setup the form template
	const template = {
		[PROJECTS]: {
			subform: {
				[NAME]: {
					type: TEXT,
					label: languages[systemLanguageCode].cv.projects.name.label,
					defaultValue: '',
					checkField: checkField([
						checkMinLength(
							3,
							languages[systemLanguageCode].checkFieldErrorMessage
								.minLength
						)
					]),
					inputParam: {
						placeholder:
							languages[systemLanguageCode].cv.projects.name
								.placeholder
					}
				},
				[SUMMARY]: {
					type: TEXTAREA,
					label:
						languages[systemLanguageCode].cv.projects.summary.label,
					defaultValue: '',
					checkField: checkField([
						checkMinLength(
							3,
							languages[systemLanguageCode].checkFieldErrorMessage
								.minLength
						)
					]),
					inputParam: {
						placeholder:
							languages[systemLanguageCode].cv.projects.summary
								.placeholder
					}
				},
				[PICTURE]: {
					type: URL_TYPE,
					label:
						languages[systemLanguageCode].cv.projects.picture.label,
					defaultValue: '',
					checkField: checkField([
						checkMinLength(
							8,
							languages[systemLanguageCode].checkFieldErrorMessage
								.minLength
						)
					]),
					inputParam: {
						placeholder:
							languages[systemLanguageCode].cv.projects.picture
								.placeholder
					}
				},
				[URL]: {
					type: URL_TYPE,
					label: languages[systemLanguageCode].cv.projects.url.label,
					defaultValue: '',
					checkField: checkField([
						checkMinLength(
							8,
							languages[systemLanguageCode].checkFieldErrorMessage
								.minLength
						)
					]),
					inputParam: {
						placeholder:
							languages[systemLanguageCode].cv.projects.url
								.placeholder
					}
				},
				[START_DATE]: {
					type: DATE,
					label:
						languages[systemLanguageCode].cv.projects.startDate
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
						languages[systemLanguageCode].cv.projects.endDate.label,
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
				[TECHNOLOGIES]: {
					subform: {
						[TECHNOLOGY]: {
							type: TECHNOLOGY_TYPE,
							label:
								languages[systemLanguageCode].cv.projects
									.technology.label,
							defaultValue: '',
							checkField: checkField([
								checkMinLength(
									3,
									languages[systemLanguageCode]
										.checkFieldErrorMessage.minLength
								)
							]),
							inputParam: {
								placeholder:
									languages[systemLanguageCode].cv.projects
										.technology.placeholder
							}
						}
					},
					addLabel:
						languages[systemLanguageCode].cv.projects
							.addTechnologies,
					removeLabel:
						languages[systemLanguageCode].cv.projects
							.removeTechnologies
				}
			},
			addLabel: languages[systemLanguageCode].cv.projects.addProjects,
			removeLabel:
				languages[systemLanguageCode].cv.projects.removeProjects
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
		/>
	);
}

export default connect(mapStateToProps)(ProjectsContainer);
