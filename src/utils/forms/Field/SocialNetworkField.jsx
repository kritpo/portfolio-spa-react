import { PropTypes } from 'prop-types';
import React, { Fragment, useCallback } from 'react';

import { Typography } from '@material-ui/core';

import CustomIcon from '../../icons/CustomIcon';
import socialIcons from '../../icons/social';
import AutocompleteField from './MasterField/AutocompleteField';

// setup fields types constants
export const SOCIAL_NETWORK = 'social_network';

// retrieve all country constants
const social_networks = Object.keys(socialIcons);

// configure the prop types validation
SocialField.propTypes = {
	form: PropTypes.object.isRequired,
	template: PropTypes.object.isRequired,
	handleForm: PropTypes.shape({
		onChange: PropTypes.func.isRequired
	}).isRequired,
	autoSubmit: PropTypes.func.isRequired,
	preName: PropTypes.string
};

function SocialField({
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
	const getOptionLabel = socialNetwork => socialNetwork;

	// setup the option render
	const renderOption = useCallback(
		socialNetwork => (
			<Fragment>
				<CustomIcon social={socialNetwork} svg />
				<Typography>{socialNetwork}</Typography>
			</Fragment>
		),
		[]
	);

	// retrieve the value
	const value =
		socialIcons[form[template.name].value] !== undefined
			? socialIcons[form[template.name].value].name
			: '';

	return (
		<AutocompleteField
			form={form}
			template={template}
			autoSubmit={autoSubmit}
			preName={preName}
			value={value}
			onChange={autocompleteOnChange}
			options={social_networks}
			getOptionLabel={getOptionLabel}
			renderOption={renderOption}
		/>
	);
}

export default SocialField;
