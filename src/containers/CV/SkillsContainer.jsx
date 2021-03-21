import { PropTypes } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { LEVEL as LEVEL_CONST } from '../../components/Portfolio/Skills/Skill/SkillItem';
import { CV_LIST } from '../../routes';
import CustomLink from '../../utils/CustomLink';
import { TECHNOLOGY } from '../../utils/forms/Field/IconSetField';
import { SELECT } from '../../utils/forms/Field/SelectField';
import Form from '../../utils/forms/Form';
import checkField, { checkUpdated } from '../../utils/forms/checkField';
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
					type: TECHNOLOGY,
					label: languages[systemLanguageCode].cv.skills.name.label,
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
							languages[systemLanguageCode].cv.skills.name
								.placeholder
					}
				},
				[LEVEL]: {
					type: SELECT,
					label: languages[systemLanguageCode].cv.skills.level.label,
					defaultValue: LEVEL_CONST[0],
					checkField: checkField([
						checkUpdated(
							'',
							languages[systemLanguageCode].checkFieldErrorMessage
								.updated
						)
					]),
					configParam: {
						fields: LEVEL_CONST
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
		>
			<CustomLink to={CV_LIST}>
				{languages[systemLanguageCode].cv.goToCVList}
			</CustomLink>
		</Form>
	);
}

export default connect(mapStateToProps)(SkillsContainer);
