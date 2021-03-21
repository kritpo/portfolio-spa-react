/**
 * setup the updated checker
 * @param {string} initialValue the initial value
 * @param {function} errorMessage the error message generator
 * @returns the field checker
 */
export const checkUpdated = (
	initialValue,
	errorMessage = length => `The field should be different of ${initialValue}.`
) => value => {
	if (value === initialValue) {
		return errorMessage(initialValue);
	}

	return '';
};

/**
 * setup the minlength checker
 * @param {string} length the minimum length
 * @param {function} errorMessage the error message generator
 * @returns the field checker
 */
export const checkMinLength = (
	length,
	errorMessage = length =>
		`The field must contains at least ${length} characters.`
) => value => {
	if (value.length < length) {
		return errorMessage(length);
	}

	return '';
};

/**
 * setup the exact length checker
 * @param {string} length the exact length
 * @param {function} errorMessage the error message generator
 * @returns the field checker
 */
export const checkExactLength = (
	length,
	errorMessage = length =>
		`The field must contains exactly ${length} characters.`
) => value => {
	if (value.length !== length) {
		return errorMessage(length);
	}

	return '';
};

/**
 * setup the regex checker
 * @param {Regex} rgx the regex to compare to
 * @param {function} errorMessage the error message generator
 * @returns the field checker
 */
export const checkRegex = (
	rgx,
	errorMessage = rgx => `The field must be on ${rgx} regex format.`
) => value => {
	if (!rgx.test(value)) {
		return errorMessage(rgx);
	}

	return '';
};

/**
 * setup the character type checker
 * @param {object} type the list of types to check
 * @param {function} errorMessage the error message generator
 * @returns the field checker
 */
export const checkCharType = (
	{ lowercase = true, uppercase = true, number = true, symbols = true },
	errorMessage = type =>
		`The field must contains at leat${lowercase ? ' - 1 lowercase' : ''}${
			uppercase ? ' - 1 uppercase' : ''
		}${number ? ' - 1 number' : ''}${symbols ? ' - 1 symbols' : ''}.`
) => value => {
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
		return errorMessage({ lowercase, uppercase, number, symbols });
	}

	return '';
};

/**
 * setup the value checker
 * @param {any} valueRef the reference value
 * @param {function} errorMessage the error message generator
 * @returns the field checker
 */
export const checkValue = (
	valueRef,
	errorMessage = valueRef => `The field must match to ${valueRef}.`
) => value => {
	if (valueRef !== value) {
		return errorMessage(valueRef);
	}

	return '';
};

/**
 * setup the date checker
 * @param {function} errorMessage the error message generator
 * @returns the field checker
 */
export const checkDate = (
	errorMessage = () => `The date is not correct.`
) => value => {
	if (!(value instanceof Date && !isNaN(value))) {
		return errorMessage();
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
