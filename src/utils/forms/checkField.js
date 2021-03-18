/**
 * setup the length checker
 * @param {string} length the minimum length
 * @returns the field checker
 */
export const checkMinLength = length => value => {
	if (value.length < length) {
		return `Le champ doit contenir au moins ${length} caractères.`;
	}

	return '';
};

/**
 * setup the regex checker
 * @param {Regex} rgx the regex to compare to
 * @returns the field checker
 */
export const checkRegex = rgx => value => {
	if (!rgx.test(value)) {
		return `Le champ doit être dans le bon format.`;
	}

	return '';
};

/**
 * setup the character type checker
 * @param {object} type the list of types to check
 * @returns the field checker
 */
export const checkCharType = ({
	lowercase = true,
	uppercase = true,
	number = true,
	symbols = true
}) => value => {
	if (
		!new RegExp(
			`${lowercase ? '(?=.*[a-z])' : ''}${
				uppercase ? '(?=.*[A-Z])' : ''
			}${number ? '(?=.*[0-9])' : ''}${
				symbols
					? '(?=.*[=+\\-^$*.[\\]{}()?"!@#%&\\/\\\\,><\':;|_~`])'
					: ''
			}`
		).test(value)
	) {
		return `Le champ doit contenir au moins${
			lowercase ? ' - 1 minuscule' : ''
		}${uppercase ? ' - 1 majuscule' : ''}${number ? ' - 1 chiffre' : ''}${
			symbols ? ' - 1 caractère spécial' : ''
		}.`;
	}

	return '';
};

/**
 * setup the value checker
 * @param {any} valueRef the reference value
 * @returns the field checker
 */
export const checkValue = valueRef => value => {
	if (valueRef !== value) {
		return `Le champ doit correspondre à ${
			typeof valueRef === 'boolean'
				? valueRef
					? 'vrai'
					: 'faux'
				: valueRef
		}.`;
	}

	return '';
};

/**
 * setup the date checker
 * @returns the field checker
 */
export const checkDate = () => value => {
	if (!(value instanceof Date && !isNaN(value))) {
		return `La date n'est pas correcte.`;
	}

	return '';
};

/**
 * setup the field checker
 * @param {array} checkers the list of field checkers
 * @returns the final field checker
 */
const checkField = checkers => value => {
	// loop all checkers
	for (let i = 0; i < checkers.length; i++) {
		// retrieve the current error
		const error = checkers[i](value);

		// check if an error occurred
		if (error !== '') {
			return error;
		}
	}

	return '';
};

export default checkField;
