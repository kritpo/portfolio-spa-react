import React from 'react';

import checkField, {
	checkMinLength,
	checkExactLength
} from '../../utils/forms/checkField';
import {
	TEXT,
	COUNTRY_CODE as COUNTRY_CODE_TYPE
} from '../../utils/forms/Field';

import Form from '../../utils/forms/Form';

// setup field name constants
export const LANGUAGES = 'languages';
export const COUNTRY_CODE = 'country_code';
export const LANGUAGE = 'language';
export const FLUENCY = 'fluency';

function LanguagesContainer({ ...props }) {
	// setup the form template
	const template = {
		[LANGUAGES]: {
			subform: {
				[COUNTRY_CODE]: {
					type: COUNTRY_CODE_TYPE,
					label: 'Code du pays',
					defaultValue: '',
					checkField: checkField([checkExactLength(2)]),
					inputParam: {
						placeholder: 'FR'
					}
				},
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
