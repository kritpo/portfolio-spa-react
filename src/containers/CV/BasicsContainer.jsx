import React from 'react';

import checkField, {
	checkMinLength,
	checkContains
} from '../../utils/forms/checkField';
import {
	TEXT,
	TEXTAREA,
	URL as URL_TYPE,
	EMAIL as EMAIL_TYPE,
	PHONE_NUMBER,
	COUNTRY_CODE as COUNTRY_CODE_TYPE
} from '../../utils/forms/Field';

import Form from '../../utils/forms/Form';

// setup field name constants
export const BASICS = 'basics';
export const NAME = 'name';
export const LABEL = 'label';
export const SUMMARY = 'summary';
export const PICTURE = 'picture';
export const EMAIL = 'email';
export const PHONE = 'phone';
export const WEBSITE = 'website';
export const ADDRESS = 'address';
export const POSTAL_CODE = 'postal_code';
export const CITY = 'city';
export const REGION = 'region';
export const COUNTRY_CODE = 'country_code';
export const PROFILES = 'profiles';
export const NETWORK = 'network';
export const USERNAME = 'username';
export const URL = 'url';

function BasicsContainer({ ...props }) {
	// setup the form template
	const template = {
		[NAME]: {
			type: TEXT,
			label: 'Nom complet',
			checkField: checkField([checkMinLength(3)]),
			inputParam: {
				placeholder: 'Jean Dupont'
			}
		},
		[LABEL]: {
			type: TEXT,
			label: 'Titre',
			checkField: checkField([checkMinLength(3)]),
			inputParam: {
				placeholder: 'Ingénieur en développement informatique'
			}
		},
		[SUMMARY]: {
			type: TEXTAREA,
			label: 'Résumé',
			checkField: checkField([checkMinLength(3)]),
			inputParam: {
				placeholder: 'Une petite description de M. Dupont'
			}
		},
		[PICTURE]: {
			type: URL_TYPE,
			label: 'Image de profil',
			checkField: checkField([checkMinLength(8)]),
			inputParam: {
				placeholder: 'https://jean-dupont.fr/mon-image.jpg'
			}
		},
		[EMAIL]: {
			type: EMAIL_TYPE,
			label: 'Adresse mail',
			checkField: checkField([checkMinLength(3), checkContains('@')]),
			inputParam: {
				placeholder: 'dupont@gmail.com'
			}
		},
		[PHONE]: {
			type: PHONE_NUMBER,
			label: 'Numéro de téléphone',
			checkField: checkField([checkMinLength(6)]),
			inputParam: {
				placeholder: '(+33) 6 12 34 56 78'
			}
		},
		[WEBSITE]: {
			type: URL_TYPE,
			label: 'Site internet',
			checkField: checkField([checkMinLength(8)]),
			inputParam: {
				placeholder: 'https://jean-dupont.fr'
			}
		},
		[ADDRESS]: {
			type: TEXT,
			label: 'Adresse postale',
			checkField: checkField([]),
			inputParam: {
				placeholder: '42, rue de la République',
				required: false
			}
		},
		[POSTAL_CODE]: {
			type: TEXT,
			label: 'Code postal',
			checkField: checkField([]),
			inputParam: {
				placeholder: '75001',
				required: false
			}
		},
		[CITY]: {
			type: TEXT,
			label: 'Ville',
			checkField: checkField([checkMinLength(3)]),
			inputParam: {
				placeholder: 'Paris'
			}
		},
		[REGION]: {
			type: TEXT,
			label: 'Région',
			checkField: checkField([]),
			inputParam: {
				placeholder: 'Île de France',
				required: false
			}
		},
		[COUNTRY_CODE]: {
			type: COUNTRY_CODE_TYPE,
			label: 'Code pays',
			checkField: checkField([checkMinLength(2)]),
			inputParam: {
				placeholder: 'FR'
			}
		},
		[PROFILES]: {
			subform: {
				[NETWORK]: {
					type: TEXT,
					label: 'Réseau',
					defaultValue: '',
					checkField: checkField([checkMinLength(2)]),
					inputParam: {
						placeholder: 'LinkedIn'
					}
				},
				[USERNAME]: {
					type: TEXT,
					label: "Nom d'utilisateur",
					defaultValue: '',
					checkField: checkField([checkMinLength(3)]),
					inputParam: {
						placeholder: 'dupont'
					}
				},
				[URL]: {
					type: URL_TYPE,
					label: 'Adresse URL',
					defaultValue: '',
					checkField: checkField([checkMinLength(8)]),
					inputParam: {
						placeholder: 'https://www.linkedin.com/in/jean-dupont/'
					}
				}
			},
			addLabel: 'Ajouter un profil',
			removeLabel: 'Supprimer le profil'
		}
	};

	return <Form template={template} errorMessage="Erreur" {...props} />;
}

export default BasicsContainer;
