import React from 'react';

import checkField, { checkMinLength } from '../../utils/forms/checkField';
import { TEXT } from '../../utils/forms/Field';

import Form from '../../utils/forms/Form';

// setup field name constants
export const INTERESTS = 'interests';
export const NAME = 'name';
export const KEYWORDS = 'keywords';
export const KEYWORD = 'keyword';

function InterestsContainer({ ...props }) {
	// setup the form template
	const template = {
		[INTERESTS]: {
			subform: {
				[NAME]: {
					type: TEXT,
					label: 'Nom',
					defaultValue: '',
					checkField: checkField([checkMinLength(3)]),
					inputParam: {
						placeholder: 'Informatique'
					}
				},
				[KEYWORDS]: {
					subform: {
						[KEYWORD]: {
							type: TEXT,
							label: 'Mot clé',
							defaultValue: '',
							checkField: checkField([checkMinLength(3)]),
							inputParam: {
								placeholder: 'Résolution de problèmes'
							}
						}
					},
					addLabel: 'Ajouter un mot clé',
					removeLabel: 'Supprimer le mot clé'
				}
			},
			addLabel: "Ajouter un centre d'intérêts",
			removeLabel: "Supprimer le centre d'intérêts"
		}
	};

	return <Form template={template} errorMessage="Erreur" {...props} />;
}

export default InterestsContainer;
