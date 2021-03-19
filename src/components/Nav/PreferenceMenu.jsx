import React from 'react';
import { PropTypes } from 'prop-types';

import { Box, FormControlLabel, Switch } from '@material-ui/core';
import { Brightness4 as Dark, Brightness7 as Light } from '@material-ui/icons';

// configure the prop types validation
PreferenceMenu.propTypes = {
	darkMode: PropTypes.bool.isRequired,
	darkModeToggle: PropTypes.func.isRequired
};

function PreferenceMenu({ darkMode, darkModeToggle }) {
	return (
		<Box display="flex">
			<FormControlLabel
				control={
					<Switch checked={darkMode} onChange={darkModeToggle} />
				}
				label={darkMode ? <Dark /> : <Light />}
			/>
		</Box>
	);
}

export default PreferenceMenu;
