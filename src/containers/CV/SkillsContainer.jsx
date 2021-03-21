import { PropTypes } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { SELECT } from '../../utils/forms/Field/SelectField';
import { TEXT } from '../../utils/forms/Field/TextField';
import Form from '../../utils/forms/Form';
import checkField, { checkMinLength } from '../../utils/forms/checkField';
import languages from '../../utils/languages';

// setup field name constants
export const SKILLS = 'skills';
export const NAME = 'name';
export const LEVEL = 'level';

// configure the states to pass as props to the component
const mapStateToProps = ({ language }, ...props) => ({
	language,
	...props
});

// configure the prop types validation
SkillsContainer.propTypes = {
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function SkillsContainer({ language: { systemLanguageCode }, ...props }) {
	// setup the form template
	const template = {
		[SKILLS]: {
			subform: {
				[NAME]: {
					type: TEXT,
					label: languages[systemLanguageCode].cv.skills.name.label,
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
							languages[systemLanguageCode].cv.skills.name
								.placeholder
					}
				},
				[LEVEL]: {
					type: SELECT,
					label: languages[systemLanguageCode].cv.skills.level.label,
					defaultValue:
						languages[systemLanguageCode].generic.level[0],
					checkField: checkField([]),
					configParam: {
						fields: languages[systemLanguageCode].generic.level
					}
				}
			},
			addLabel: languages[systemLanguageCode].cv.skills.addSkills,
			removeLabel: languages[systemLanguageCode].cv.skills.removeSkills
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

export default connect(mapStateToProps)(SkillsContainer);
