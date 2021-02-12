import React from 'react';
import { PropTypes } from 'prop-types';

import { Grid, Box } from '@material-ui/core';

import Skill from './Skills/Skill';
import Languages from './Skills/Languages';
import Hobbies from './Skills/Hobbies';

// configure the prop types validation
Skills.propTypes = {
	resume: PropTypes.shape({
		skills: PropTypes.arrayOf(PropTypes.object).isRequired,
		languages: PropTypes.arrayOf(PropTypes.object).isRequired,
		interests: PropTypes.arrayOf(PropTypes.object).isRequired
	}).isRequired
};

function Skills({ resume }) {
	return (
		<Box textAlign="center" clone>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<Skill resume={resume} />
				</Grid>
				<Grid item xs={12} md={6}>
					<Languages resume={resume} />
				</Grid>
				<Grid item xs={12} md={6}>
					<Hobbies resume={resume} />
				</Grid>
			</Grid>
		</Box>
	);
}

export default Skills;
