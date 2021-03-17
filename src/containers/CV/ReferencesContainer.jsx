import React from 'react';

import checkField, { checkMinLength } from '../../utils/forms/checkField';
import { TEXT, TEXTAREA } from '../../utils/forms/Field';

import Form from '../../utils/forms/Form';

// setup field name constants
export const REFERENCES = 'references';
export const NAME = 'name';
export const REFERENCE = 'reference';

function ReferencesContainer({ ...props }) {
	// setup the form template
	const template = {
		[REFERENCES]: {
			subform: {
				[NAME]: {
					type: TEXT,
					label: 'Nom',
					defaultValue: '',
					checkField: checkField([checkMinLength(3)]),
					inputParam: {
						placeholder: 'Jeanne Dupont'
					}
				},
				[REFERENCE]: {
					type: TEXTAREA,
					label: 'Référence',
					defaultValue: '',
					checkField: checkField([checkMinLength(3)]),
					inputParam: {
						placeholder: 'Jean est un très bon élément.'
					}
				}
			},
			addLabel: 'Ajouter une référence',
			removeLabel: 'Supprimer la référence'
		}
	};

	return <Form template={template} errorMessage="Erreur" {...props} />;
}

export default ReferencesContainer;
