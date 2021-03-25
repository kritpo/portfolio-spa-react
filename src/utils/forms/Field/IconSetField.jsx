import { PropTypes } from 'prop-types';
import React, { Fragment, useCallback } from 'react';

import { Box } from '@material-ui/core';

import CustomIcon from '../../icons/CustomIcon';
import hobbyIcons from '../../icons/hobby';
import socialIcons from '../../icons/social';
import technologyIcons from '../../icons/technology';
import AutocompleteField from './MasterField/AutocompleteField';

// setup fields types constants
export const HOBBY = 'hobby';
export const SOCIAL = 'social';
export const TECHNOLOGY = 'technology';

// retrieve all icons constants
const hobbies = Object.keys(hobbyIcons);
const socials = Object.keys(socialIcons);
const technologies = Object.keys(technologyIcons);

// configure the prop types validation
IconSetField.propTypes = {
	form: PropTypes.object.isRequired,
	template: PropTypes.object.isRequired,
	handleForm: PropTypes.shape({
		onChange: PropTypes.func.isRequired
	}).isRequired,
	autoSubmit: PropTypes.func.isRequired,
	preName: PropTypes.string
};

function IconSetField({
	form,
	template,
	handleForm: { onChange },
	autoSubmit,
	preName
}) {
	// setup local onChange
	const autocompleteOnChange = useCallback(
		(event, value) => {
			// check if the value is defined
			if (value) {
				// update the value code
				onChange(template.name)({
					target: { value }
				});
			}
		},
		[template.name, onChange]
	);

	// setup the option label retriever
	const getOptionLabel = value => value;

	// setup the option render
	const renderOption = useCallback(
		value => (
			<Fragment>
				<CustomIcon
					hobby={template.type === HOBBY ? value : undefined}
					social={template.type === SOCIAL ? value : undefined}
					technology={
						template.type === TECHNOLOGY ? value : undefined
					}
					svg
				/>
				<Box ml={1}>{value}</Box>
			</Fragment>
		),
		[template.type]
	);

	// retrieve the value
	const value =
		template.type === HOBBY &&
		hobbyIcons[form[template.name].value] !== undefined
			? hobbyIcons[form[template.name].value].name
			: template.type === SOCIAL &&
			  socialIcons[form[template.name].value] !== undefined
			? socialIcons[form[template.name].value].name
			: template.type === TECHNOLOGY &&
			  technologyIcons[form[template.name].value] !== undefined
			? technologyIcons[form[template.name].value].name
			: '';

	return (
		<AutocompleteField
			form={form}
			template={template}
			autoSubmit={autoSubmit}
			preName={preName}
			value={value}
			onChange={autocompleteOnChange}
			options={
				template.type === HOBBY
					? hobbies
					: template.type === SOCIAL
					? socials
					: technologies
			}
			getOptionLabel={getOptionLabel}
			renderOption={renderOption}
		/>
	);
}

export default IconSetField;
