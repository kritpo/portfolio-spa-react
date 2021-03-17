import React from 'react';

import checkField, { checkMinLength } from '../../utils/forms/checkField';
import { TEXT, SELECT } from '../../utils/forms/Field';
import { LEVEL as LEVEL_CONST } from '../../components/Portfolio/Skills/Skill/SkillItem';

import Form from '../../utils/forms/Form';

// setup field name constants
export const SKILLS = 'skills';
export const NAME = 'name';
export const LEVEL = 'level';

function SkillsContainer({ ...props }) {
	// setup the form template
	const template = {
		[SKILLS]: {
			subform: {
				[NAME]: {
					type: TEXT,
					label: 'Nom',
					defaultValue: '',
					checkField: checkField([checkMinLength(3)]),
					inputParam: {
						placeholder: 'Javascript'
					}
				},
				[LEVEL]: {
					type: SELECT,
					label: 'Niveau',
					defaultValue: LEVEL_CONST[0],
					checkField: checkField([]),
					configParam: {
						fields: LEVEL_CONST
					}
				}
			},
			addLabel: 'Ajouter une compétence',
			removeLabel: 'Supprimer la compétence'
		}
	};

	return <Form template={template} errorMessage="Erreur" {...props} />;
}

export default SkillsContainer;
