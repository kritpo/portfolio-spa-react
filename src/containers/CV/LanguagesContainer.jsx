import React from 'react';

import checkField, { checkMinLength } from '../../utils/forms/checkField';
import { TEXT } from '../../utils/forms/Field';

import Form from '../../utils/forms/Form';

// setup field name constants
export const LANGUAGES = 'languages';
export const LANGUAGE = 'language';
export const FLUENCY = 'fluency';

function LanguagesContainer({ ...props }) {
	// setup the form template
	const template = {
		[LANGUAGES]: {
			subform: {
				[LANGUAGE]: {
					type: TEXT,
					label: 'Langue',
					defaultValue: '',
					checkField: checkField([checkMinLength(3)]),
					inputParam: {
						placeholder: 'Français'
					}
				},
				[FLUENCY]: {
					type: TEXT,
					label: 'Niveau',
					defaultValue: '',
					checkField: checkField([checkMinLength(3)]),
					inputParam: {
						placeholder: 'Avancé'
					}
				}
			},
			addLabel: 'Ajouter une langue',
			removeLabel: 'Supprimer la langue'
		}
	};

	return <Form template={template} errorMessage="Erreur" {...props} />;
}

export default LanguagesContainer;
