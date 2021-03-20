import React from 'react';
import { PropTypes } from 'prop-types';

import { IMaskInput } from 'react-imask';

// configure the prop types validation
MaskField.propTypes = {
	onChange: PropTypes.func.isRequired
};

function MaskField({ onChange, ...props }) {
	return (
		<IMaskInput
			{...props}
			unmask={false}
			onAccept={value => onChange({ target: { value } })}
		/>
	);
}

export default MaskField;
