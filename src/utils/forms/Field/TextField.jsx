import { PropTypes } from 'prop-types';
import React from 'react';

import { TextField as MuiTextField } from '@material-ui/core';

import MaskField from './MasterField/MaskField';

// setup fields types constants
export const TEXT = 'text';
export const TEXTAREA = 'textarea';
export const EMAIL = 'email';
export const PASSWORD = 'password';
export const NUMBER_2 = 'number_2';
export const URL = 'url';
export const PHONE_NUMBER = 'phone_number';

// setup the mask array
const maskInput = {
	[NUMBER_2]: {
		mask: Number,
		props: {
			scale: 2,
			signed: false,
			thousandsSeparator: ' ',
			normalizeZeros: true,
			radix: '.',
			mapToRadix: [',']
		}
	},
	[URL]: {
		mask: /^((|h|ht|htt|https?|https?:|https?:\/|https?:\/\/)|(https?:\/\/[A-Za-z0-9\-_./+:#?%=&]+))$/
	},
	[PHONE_NUMBER]: {
		mask: '(+1[00]) 000 000 000 000 00',
		props: {
			definitions: {
				1: /[1-9]/
			}
		}
	}
};

// configure the prop types validation
TextField.propTypes = {
	form: PropTypes.objectOf(
		PropTypes.oneOfType([
			PropTypes.shape({
				value: PropTypes.any,
				error: PropTypes.string.isRequired
			}),
			PropTypes.array,
			PropTypes.number
		])
	).isRequired,
	template: PropTypes.shape({
		name: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		inputParam: PropTypes.object
	}).isRequired,
	handleForm: PropTypes.shape({
		onChange: PropTypes.func.isRequired,
		onBlur: PropTypes.func.isRequired
	}).isRequired,
	autoSubmit: PropTypes.func.isRequired,
	preName: PropTypes.string
};

function TextField({
	form,
	template: { name, type, label, inputParam = {} },
	handleForm: { onChange, onBlur },
	autoSubmit,
	preName
}) {
	// retrieve the sub type
	const subType = type === EMAIL || type === PASSWORD ? type : TEXT;

	return (
		<MuiTextField
			id={`${preName !== undefined ? `${preName}_` : ''}${name}`}
			type={subType}
			label={label}
			value={form[name].value}
			helperText={form[name].error}
			onChange={onChange(name)}
			onBlur={onBlur(name)}
			error={form[name].error !== ''}
			onKeyPress={type !== TEXTAREA ? autoSubmit : undefined}
			multiline={type === TEXTAREA}
			fullWidth
			required
			InputProps={
				maskInput[type] !== undefined
					? {
							inputComponent: MaskField
					  }
					: undefined
			}
			inputProps={
				maskInput[type] !== undefined
					? {
							mask: maskInput[type].mask,
							...maskInput[type].props
					  }
					: undefined
			}
			{...inputParam}
		/>
	);
}

export default TextField;
